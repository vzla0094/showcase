import { IUser } from './user'

import { IEvent } from './events'

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
