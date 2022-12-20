import { DocumentData, DocumentReference } from 'firebase/firestore'

import { IGeolocation } from './location'

export interface IUser {
  uid: string
  details: UserDetailsType
  geolocation: IGeolocation
  company: DocumentReference<DocumentData> | ''
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
