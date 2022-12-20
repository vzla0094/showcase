export enum StatusIUserLocation {
  init = 'init',
  allowed = 'allowed',
  denied = 'denied',
}

export interface IUserLocationDefault {
  status: StatusIUserLocation.init
}

export interface IGeolocation {
  geoHash: string
  accuracy: number | null
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
