import { getRandomBytes } from 'expo-random'
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage'

import { handleError } from '../helpers'

import { app } from './config'

const storage = getStorage(app)

export const saveImage = async (imageUri: string, path: string) => {
  try {
    const fileExtension = imageUri.substring(imageUri.lastIndexOf('.') + 1)
    const fileName = `${getRandomBytes(10)}.${fileExtension}`
    const storingPath = `${path}/${fileName}`
    const imageStoringRef = ref(storage, storingPath)

    // Note: Generating the blob using the native fetch api doesn't work
    // on development when debugging remote JS
    const response = await fetch(imageUri)
    const blob = await response.blob()

    const uploadResult = await uploadBytes(imageStoringRef, blob)

    return getDownloadURL(uploadResult.ref)
  } catch (e) {
    throw handleError('Error saving image', e)
  }
}

export const removeImage = async (imageUri: string) => {
  try {
    const imagePath = imageUri.substring(imageUri.indexOf('/o/') + 3)
    const queryStringIndex = imagePath.indexOf('?')
    const imagePathWithoutQuery =
      queryStringIndex > -1
        ? imagePath.substring(0, queryStringIndex)
        : imagePath
    const decodedImagePath = decodeURIComponent(imagePathWithoutQuery)
    const imageRef = ref(storage, decodedImagePath)

    await deleteObject(imageRef)
  } catch (e) {
    throw handleError('Error removing image: ', e)
  }
}

export const getStorageImageURL = (url: string) =>
  getDownloadURL(ref(storage, url))
