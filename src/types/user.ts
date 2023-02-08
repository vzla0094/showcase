import { DocumentData, DocumentReference } from 'firebase/firestore'

import { emptyGeoLocation, IGeolocation } from './location'
import { EVENT_CATEGORY_NAMES, IEventSelector } from './events'

export interface IUser {
  uid: string
  details: UserDetailsType
  geolocation: IGeolocation
  company: DocumentReference<DocumentData> | ''
  searchFilterSettings: SearchFilterSettings
  events: Array<UserEvent>
}

export const emptyUser: IUser = {
  uid: '',
  details: {
    username: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    phoneNumber: '',
  },
  geolocation: emptyGeoLocation,
  company: '',
  searchFilterSettings: {
    activities: false,
    accommodation: false,
    transportation: false,
    food: false,
    venues: false,
    radiusDistance: 0,
  },
  events: [],
}

export enum USER_DETAILS {
  Username = 'username',
  BirthDay = 'birthDay',
  BirthMonth = 'birthMonth',
  BirthYear = 'birthYear',
  PhoneNumber = 'phoneNumber',
}

export type UserDetailsType = {
  [key in USER_DETAILS]: string
}

export interface IUserDetailsField {
  fieldKey: USER_DETAILS
  value: string
}

export interface IAuth {
  email: string
  password: string
}

type SearchFilterSettings = {
  [key in EVENT_CATEGORY_NAMES]: boolean
} & {
  radiusDistance: number
}

export type SearchFilterSettingsField = {
  fieldKey: keyof SearchFilterSettings
  value: number | boolean
}

export type UserEvent = IEventSelector
