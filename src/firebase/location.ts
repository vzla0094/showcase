import {
  geocodeAsync,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { distanceBetween, geohashForLocation, Geopoint } from 'geofire-common'

import {
  emptyGeoLocation,
  IEvent,
  IGeolocation,
  IIsEventInRangeParams,
  IUseLocationRequest,
  StatusIUserLocation,
} from '../types'

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

// replaces spaces with +
// or returns an empty string when addressField is empty
const formatAddressField = (addressField: string) =>
  addressField ? addressField.split(' ').join('+') : ''

export const getAddressQuery = ({
  streetAddress,
  city,
  stateProvince,
  country,
  zipCode,
}: IEvent) => {
  const addressFields = [streetAddress, city, stateProvince, country, zipCode]

  return `${addressFields
    .map(addressField => formatAddressField(addressField))
    .filter(formattedAddressField => Boolean(formattedAddressField))
    .join(',+')}`
}

export const getEventGeoLocation = async (
  addressQuery: string
): Promise<IGeolocation> => {
  if (!addressQuery) return emptyGeoLocation

  try {
    const data = await geocodeAsync(addressQuery)

    const { latitude, longitude, accuracy } = data[0]

    const geoHash = geohashForLocation([latitude, longitude])

    return {
      latitude,
      longitude,
      accuracy,
      geoHash,
    }
  } catch (e) {
    console.error('Error getting event geo location: ', e)

    return e
  }
}

//Calculation: 1 miles -> 1.60934 km
const getKilometersFromMiles = (miles: number) => 1.60934 * miles

// TODO: should be moved to google function in order to fetch only events in range
export const isEventWithinRange = ({
  eventLatitude,
  eventLongitude,
  userLatitude,
  userLongitude,
  eventsRange,
}: IIsEventInRangeParams) => {
  const userCenterPosition: Geopoint = [userLatitude, userLongitude]
  const eventCenterPosition: Geopoint = [eventLatitude, eventLongitude]

  const distanceKm = distanceBetween(eventCenterPosition, userCenterPosition)
  const eventsRangeKm = getKilometersFromMiles(eventsRange)

  return distanceKm <= eventsRangeKm
}
