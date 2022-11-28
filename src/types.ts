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
  Dashboard: undefined
  CreateEvent: {
    eventId: string
  }
  CompanyDetails: undefined
}

export type UnAuthStackScreenProps<Screen extends keyof UnAuthStackParamList> =
  NativeStackScreenProps<UnAuthStackParamList, Screen>

export type AuthBottomTabScreenProps<
  Screen extends keyof AuthBottomTabParamList
> = BottomTabScreenProps<AuthBottomTabParamList, Screen>

export type CompanyStackScreenProps<
  Screen extends keyof CompanyStackParamList
> = NativeStackScreenProps<CompanyStackParamList, Screen>

// Deals
export type DealCategoryNames =
  | 'Food'
  | 'Activities'
  | 'Events'
  | 'Stay'
  | 'Transportation'

export interface IDealCategory {
  name: DealCategoryNames
  deals: Array<IDeal>
}

export type ToggleButtonOnPress = (buttonValue: DealCategoryNames) => void

export interface IDealProps {
  title: string
  description: string
}

type TimeSlot = [{ start: string; end: string }]
interface ITimeSlots {
  sunday: TimeSlot
  monday: TimeSlot
  tuesday: TimeSlot
  wednesday: TimeSlot
  thursday: TimeSlot
  friday: TimeSlot
  saturday: TimeSlot
}

interface IReview {
  uuid: string
  comment: string
  rating: string
}

export interface IDeal {
  category: DealCategoryNames
  timeSlots?: Partial<ITimeSlots>
  dealId: string
  active: boolean
  validatedUsers: Array<string>
  title: string
  description: string
  imageGallery: Array<string>
  thumbnail: string
  coverImage: string
  startDate: string
  endDate: string
  quantityLimit: string
  reviews: Array<IReview>
  companyId?: ICompany['companyId']
}

// Users
export interface IUser {
  uid: string
  details: UserDetailsType
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
  events?: Array<IEvent>
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

export interface ICompanyDetailsField {
  fieldKey: COMPANY_DETAILS
  value: string | boolean
}

// Events
export enum EVENT_FIELD_NAMES {
  EventName = 'eventName',
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
  company: DocumentReference<DocumentData> | ''
  name: string
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

export interface IFirebaseInputField {
  fieldKey: any
  value: any
}
