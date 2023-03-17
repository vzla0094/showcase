import { DocumentData, DocumentReference } from 'firebase/firestore'

import { emptyGeoLocation, IGeolocation } from './location'
import { EVENT_CATEGORY_NAMES, IEvent } from './events'

export interface IUser {
  uid: string
  details: UserDetailsType
  geolocation: IGeolocation
  companyRef: DocumentReference<DocumentData> | ''
  searchFilterSettings: SearchFilterSettings
  eventsDataRefs: Array<IUserEventDataRef>
}

export const emptyUser: IUser = {
  uid: '',
  details: {
    username: '',
    phoneNumber: '',
    birthDate: '',
  },
  geolocation: emptyGeoLocation,
  companyRef: '',
  searchFilterSettings: {
    activities: false,
    accommodation: false,
    transportation: false,
    food: false,
    venues: false,
    radiusDistance: 0,
  },
  eventsDataRefs: [],
}

export enum USER_DETAILS {
  Username = 'username',
  PhoneNumber = 'phoneNumber',
  BirthDate = 'birthDate',
}

export type UserDetailsType = {
  [key in USER_DETAILS]: string
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

export interface IUserEventDataRef {
  eventId: IEvent['id']
  eventRef: DocumentReference<DocumentData>
  ticketCount: number
}

export interface IUserEventData {
  event: IEvent
  ticketCount: number
}

export type EditUserDetailsSubmitType = (userDetails: IUser['details']) => void
