import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { geohashForLocation } from 'geofire-common'

import { IUseLocationRequest, StatusIUserLocation } from '../types'

export const requestPermissionsAsync =
  async (): Promise<IUseLocationRequest> => {
    try {
      const { status } = await requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        return {
          status: StatusIUserLocation.denied,
          description: 'Permission to access location was denied',
          variant: 'error',
        }
      }

      const {
        coords: { latitude, longitude, accuracy },
      } = await getCurrentPositionAsync({})

      if (latitude && longitude) {
        const geoHash = geohashForLocation([latitude, longitude])

        return {
          status: StatusIUserLocation.allowed,
          geolocation: { latitude, longitude, accuracy, geoHash },
        }
      }

      return {
        status: StatusIUserLocation.init,
      }
    } catch (e) {
      console.error(`Error: useLocation`, e)
      throw e
    }
  }
