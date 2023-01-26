import { IUser } from './user'
import { EVENT_CATEGORY_NAMES, ICompanyActiveEvent, IEvent } from './events'
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
  activeEvent: ICompanyActiveEvent
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

export interface ISetCompanyActiveEventPayload {
  eventId: IEvent['id']
  eventCategory: EVENT_CATEGORY_NAMES
  event?: ICompanyActiveEvent
}
