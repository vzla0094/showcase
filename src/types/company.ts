import { IUser } from './user'
import { IEvent } from './events'
import { IAddress } from './location'

export interface ICompany extends IAddress {
  companyId: string
  name: string
  members?: Array<IUser['uid']>
  events: Array<IEvent['id']>
  active: boolean
  telephoneNumber: string
  cellphoneNumber: string
  email: string
}

export const emptyCompany: ICompany = {
  companyId: '',
  name: '',
  members: [],
  events: [],
  active: false,
  streetAddress: '',
  city: '',
  stateProvince: '',
  country: '',
  zipCode: '',
  telephoneNumber: '',
  cellphoneNumber: '',
  email: '',
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
  companyRef: IUser['companyRef']
}

export interface IAddEventPayload {
  companyId: ICompany['companyId']
  eventId: IEvent['id']
}
