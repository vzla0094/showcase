import { NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'

import { DocumentData, DocumentReference } from 'firebase/firestore'

// Navigation
export type UnAuthStackParamList = {
  Discovery: undefined
  LoginOrRegister: undefined
}

export type AuthBottomTabParamList = {
  Discovery: undefined
  Search: undefined
  Profile: undefined
  Company: NavigatorScreenParams<CompanyStackParamList>
}

export type CompanyStackParamList = {
  CompanyDashboard: undefined
  EditEvent: {
    id: string
  }
  CompanyDetails: undefined
  Event: {
    id: IEvent['id']
  }
}

export type UnAuthStackScreenProps<Screen extends keyof UnAuthStackParamList> =
  NativeStackScreenProps<UnAuthStackParamList, Screen>

export type AuthBottomTabScreenProps<
  Screen extends keyof AuthBottomTabParamList
> = BottomTabScreenProps<AuthBottomTabParamList, Screen>

export type CompanyStackScreenProps<
  Screen extends keyof CompanyStackParamList
> = NativeStackScreenProps<CompanyStackParamList, Screen>

// Users
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

// Companies
export interface ICompany {
  companyId: string
  name: string
  members?: Array<IUser['uid']>
  events: Array<IEvent['id']>
  active: boolean
  streetAddress: string
  city: string
  stateProvince: string
  country: string
  zipCode: string
  latitude?: string
  longitude?: string
  telephoneNumber: string
  cellphoneNumber: string
  email: string
}

export enum COMPANY_DETAILS {
  Name = 'name',
  StreetAddress = 'streetAddress',
  City = 'city',
  StateProvince = 'stateProvince',
  Country = 'country',
  ZipCode = 'zipCode',
  TelephoneNumber = 'telephoneNumber',
  CellphoneNumber = 'cellphoneNumber',
  Email = 'email',
}

export type CompanyDetailsType = {
  [key in COMPANY_DETAILS]: string
}

export interface IInitializeCompanyData {
  companyId: ICompany['companyId']
}

export interface IAddEventPayload {
  companyId: ICompany['companyId']
  eventId: IEvent['id']
}

// Events
export type ToggleButtonOnPress = (buttonValue: EVENT_CATEGORIES) => void

export enum EVENT_FIELD_NAMES {
  Name = 'name',
  Description = 'description',
}

export type EventValuesType = {
  [key in EVENT_FIELD_NAMES]: string
}

interface ITicket {
  reservedTimeStamp: string
  redeemedTimeStamp: string
  id: string
}

export interface IEvent {
  id: string
  company: ICompany['companyId']
  name: string
  category: EVENT_CATEGORIES | ''
  state: 'draft' | 'published' | 'expired'
  description: string
  startDateTime: string
  endDateTime: string
  ticketCount: number
  ticketLimit: number
  tickets: Array<ITicket>
  timeSlots: []
}

export interface IEditEventPayload {
  id: IEvent['id']
  data: Partial<IEvent>
}

export interface IFirebaseInputField<FieldKeys, FieldValue> {
  fieldKey: FieldKeys
  value: FieldValue
}

export type handleEventPressType = (eventId: IEvent['id']) => void

export enum EVENT_CATEGORIES {
  Food = 'food',
  Activities = 'activities',
  Events = 'events',
  Accommodation = 'accommodation',
  Transportation = 'transportation',
}

export interface IEventCategory {
  name: EVENT_CATEGORIES
  events: Array<IEvent>
}

export interface IEventProps {
  name: string
  description: string
}

// Location
export enum StatusIUserLocation {
  init = 'init',
  allowed = 'allowed',
  denied = 'denied',
}

interface IUserLocationDefault {
  status: StatusIUserLocation.init
}

export interface IGeolocation {
  geoHash: string
  accuracy: number | null
  latitude: number
  longitude: number
}

// Limit used keys to what is present in T
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
