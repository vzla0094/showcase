import { DocumentData, DocumentReference } from 'firebase/firestore'

import { IGeolocation } from './location'
import { EVENT_CATEGORY_NAMES } from './events'

export interface IUser {
  uid: string
  details: UserDetailsType
  geolocation: IGeolocation
  company: DocumentReference<DocumentData> | ''
  searchFilterSettings: SearchFilterSettings
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
  geolocation: {
    geoHash: '',
    accuracy: 0,
    latitude: 0,
    longitude: 0,
  },
  company: '',
  searchFilterSettings: {
    activities: false,
    accommodation: false,
    transportation: false,
    food: false,
    venues: false,
    radiusDistance: '',
  },
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
  radiusDistance: string
}

export type SearchFilterSettingsField = {
  fieldKey: keyof SearchFilterSettings
  value: string | boolean
}

export interface IFirebaseSettingsSwitchField<FieldKeys> {
  fieldKey: FieldKeys
  value: boolean
}
