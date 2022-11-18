import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { DocumentData, DocumentReference } from 'firebase/firestore'

// Navigation
export type RootStackParamList = {
  LoginOrRegister: undefined
  Landing: undefined
  Questionnaire: undefined
  Discovery: undefined
  Search: undefined
  Profile: undefined
  Promotion: undefined
  Company: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>

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
  username = 'username',
  birthDay = 'birthDay',
  birthMonth = 'birthMonth',
  birthYear = 'birthYear',
  phoneNumber = 'phoneNumber',
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
  deals?: Array<string>
  active: boolean
  address: {
    streetAddress: string
    city: string
    stateProvince: string
    country: string
    zipCode: string
    latitude?: string
    longitude?: string
  }
  contactInfo: {
    telephoneNumber: string
    cellphoneNumber: string
    email: string
  }
}

export enum COMPANY_ADDRESS_DETAILS {
  streetAddress = 'streetAddress',
  city = 'city',
  stateProvince = 'stateProvince',
  country = 'country',
  zipCode = 'zipCode',
}

export enum COMPANY_CONTACT_DETAILS {
  telephoneNumber = 'telephoneNumber',
  cellphoneNumber = 'cellphoneNumber',
  email = 'email',
}

export type CompanyAddressType = {
  [key in COMPANY_ADDRESS_DETAILS]: string
}

export type CompanyContactInfoType = {
  [key in COMPANY_CONTACT_DETAILS]: string
}

export type CompanyDetailsType = {
  name: string
} & CompanyAddressType &
  CompanyContactInfoType

export interface IInitializeCompanyData {
  companyId: ICompany['companyId']
  uid: IUser['uid']
}

export interface ICompanyDetailsField {
  fieldKey:
    | COMPANY_ADDRESS_DETAILS
    | COMPANY_CONTACT_DETAILS
    | 'name'
    | 'active'
  value: string | boolean
}

export interface ICompanyDetailsPayload {
  detailSection?: 'address' | 'contactInfo'
  companyDetailsField: ICompanyDetailsField
}
