import { LocationGeocodedLocation, LocationObjectCoords } from 'expo-location'
import { IUser } from './user'

export enum StatusIUserLocation {
  init = 'init',
  allowed = 'allowed',
  denied = 'denied',
}

export interface IUserLocationDefault {
  status: StatusIUserLocation.init
}

export const emptyGeoLocation: IGeolocation = {
  geoHash: '',
  accuracy: 0,
  latitude: 0,
  longitude: 0,
}

export interface IGeolocation {
  geoHash: string
  accuracy:
    | LocationGeocodedLocation['accuracy']
    | LocationObjectCoords['accuracy']
  latitude: number
  longitude: number
} // Limit used keys to what is present in T

export interface IShowArgs {
  description: string
  variant?: 'success' | 'error' | 'warning' | 'info'
} // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ILocationError extends IShowArgs {
  status: StatusIUserLocation.denied
}

export interface ILocationSuccess {
  status: StatusIUserLocation.allowed
  geolocation: IGeolocation
}

export type IUseLocationRequest =
  | ILocationSuccess
  | ILocationError
  | IUserLocationDefault

export interface IAddress {
  streetAddress: string
  city: string
  stateProvince: string
  country: string
  zipCode: string
}

export interface IIsEventInRangeParams {
  eventLatitude: IGeolocation['latitude']
  eventLongitude: IGeolocation['longitude']
  userLatitude: IGeolocation['latitude']
  userLongitude: IGeolocation['longitude']
  eventsRange: IUser['searchFilterSettings']['radiusDistance']
}
