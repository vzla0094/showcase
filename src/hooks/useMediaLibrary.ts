import { useEffect, useState } from 'react'
import { Linking } from 'react-native'
import {
  ImagePickerResult,
  launchCameraAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  PermissionStatus,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from 'expo-image-picker'

import { useToast } from './useToast'

const quality = 0.5

export const useMediaLibrary = () => {
  const toast = useToast()
  const [mediaStoragePermission, setMediaStoragePermission] = useState(
    PermissionStatus.UNDETERMINED
  )
  const [cameraStatus, requestCameraPermission] = useCameraPermissions()
  const [libraryStatus, requestLibraryPermission] = useMediaLibraryPermissions()

  useEffect(() => {
    if (libraryStatus?.status === PermissionStatus.GRANTED) {
      setMediaStoragePermission(libraryStatus.status)
    }
  }, [libraryStatus])

  const isMediaStorageAllowed =
    mediaStoragePermission === PermissionStatus.GRANTED
  const isMediaStorageDenied =
    mediaStoragePermission === PermissionStatus.DENIED

  const showDeniedPermissionToast = () =>
    toast.show({
      description: 'Please give permissions to the app to your library first',
      variant: 'error',
    })

  const isUserDenyingPhotosPermission = () =>
    libraryStatus?.status === PermissionStatus.DENIED &&
    libraryStatus.accessPrivileges === 'none'

  /* Get a photo from the user's library */
  const getPhotoFromMediaLibrary = async () => {
    try {
      if (libraryStatus?.status === PermissionStatus.UNDETERMINED) {
        await requestLibraryPermission()

        if (libraryStatus.accessPrivileges === 'none') {
          showDeniedPermissionToast()

          // TODO(Yamil): Add behavior to send the user to the settings
          return new Promise<ImagePickerResult>(resolve => {
            resolve({
              cancelled: true,
            } as ImagePickerResult)
          })
        }
      }
    } catch (e) {
      console.error('Error: getPhotoFromMediaLibrary')
    }

    // When the user allows the app after rejecting sometimes it changes
    // the accessPrivileges but not the status
    if (isUserDenyingPhotosPermission()) {
      showDeniedPermissionToast()

      // TODO(Yamil): Add behavior to send the user to the settings
      return new Promise<ImagePickerResult>(resolve => {
        resolve({
          cancelled: true,
        } as ImagePickerResult)
      })
    }
    //TODO: @voxtns See particular cases in IOS and image editing
    return launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images,
      quality,
    })
  }

  /* Allow the user to take a photo */
  const getPhotoFromCamera = async () => {
    if (cameraStatus?.status === PermissionStatus.UNDETERMINED) {
      await requestCameraPermission()
    }

    if (cameraStatus?.status === PermissionStatus.DENIED) {
      showDeniedPermissionToast()

      // TODO(Yamil): Add behavior to send the user to the settings
      return new Promise<ImagePickerResult>(resolve => {
        resolve({
          cancelled: true,
        } as ImagePickerResult)
      })
    }

    return launchCameraAsync({
      allowsEditing: true,
      mediaTypes: MediaTypeOptions.Images,
      quality,
    })
  }

  const hasPermissionMediaStorage = async () => {
    const { status } = await requestLibraryPermission()
    setMediaStoragePermission(status)
    return status
  }

  const onPressPermissionMediaStorage = async () => {
    const status = await hasPermissionMediaStorage()
    if (status !== PermissionStatus.DENIED || !isMediaStorageDenied) return
    Linking.openSettings()
  }

  return {
    hasPermissionMediaStorage,
    isMediaStorageAllowed,
    isMediaStorageDenied,
    getPhotoFromMediaLibrary,
    getPhotoFromCamera,
    onPressPermissionMediaStorage,
  }
}
