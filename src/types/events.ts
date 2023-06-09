import { ICompany } from './company'
import { emptyGeoLocation, IAddress, IGeolocation } from './location'
import { ITicket, ITicketType } from './tickets'

export type ToggleButtonOnPress = (buttonValue: EVENT_CATEGORY_NAMES) => void

export enum EVENT_FORM_FIELD_NAMES {
  Name = 'name',
  Description = 'description',
  Category = 'category',
  State = 'state',
  StreetAddress = 'streetAddress',
  City = 'city',
  StateProvince = 'stateProvince',
  Country = 'country',
  ZipCode = 'zipCode',
  StartDateTime = 'startDateTime',
  EndDateTime = 'endDateTime',
}

export type EventFormValuesType = {
  [key in EVENT_FORM_FIELD_NAMES]: string
} & {
  image: { alt: string; uri: string }
}

export interface IEvent extends IAddress, IGeolocation {
  id: string
  company: ICompany['companyId']
  name: string
  category: EVENT_CATEGORY_NAMES
  state: 'draft' | 'published' | 'expired'
  description: string
  startDateTime: string
  endDateTime: string
  ticketCount: number
  ticketLimit: number
  timeSlots: []
  image: { alt: string; uri: string }
}

export interface IActiveEventState {
  event: IEvent
  tickets: Array<ITicket>
  ticketTypes: Array<ITicketType>
}

export interface IFirebaseInputField<FieldKeys, FieldValue> {
  fieldKey: FieldKeys
  value: FieldValue
}

export type HandleEventPressType = (values: IEventSelector) => void

export enum EVENT_CATEGORY_NAMES {
  Food = 'food',
  Activities = 'activities',
  Venues = 'venues',
  Accommodation = 'accommodation',
  Transportation = 'transportation',
}

export interface IEventCategory {
  name: EVENT_CATEGORY_NAMES
  events: Array<IEvent>
  showMore: boolean
}

export enum EVENT_PATHS {
  Food = 'eventsFood',
  Activities = 'eventsActivities',
  Venues = 'eventsVenues',
  Accommodation = 'eventsAccommodation',
  Transportation = 'eventsTransportation',
}

export const categoryNamesArr = [
  EVENT_CATEGORY_NAMES.Food,
  EVENT_CATEGORY_NAMES.Activities,
  EVENT_CATEGORY_NAMES.Venues,
  EVENT_CATEGORY_NAMES.Accommodation,
  EVENT_CATEGORY_NAMES.Transportation,
]
export const categoryPathMap = {
  food: EVENT_PATHS.Food,
  activities: EVENT_PATHS.Activities,
  venues: EVENT_PATHS.Venues,
  accommodation: EVENT_PATHS.Accommodation,
  transportation: EVENT_PATHS.Transportation,
}
export const emptyEvent: IEvent = {
  id: '',
  company: '',
  name: '',
  state: 'draft',
  category: EVENT_CATEGORY_NAMES.Food,
  description: '',
  startDateTime: '',
  endDateTime: '',
  ticketCount: 0,
  ticketLimit: 0,
  timeSlots: [],
  streetAddress: '',
  city: '',
  stateProvince: '',
  country: '',
  zipCode: '',
  image: { alt: '', uri: '' },
  ...emptyGeoLocation,
}

// used for retrieving event documents from firebase
export interface IEventSelector {
  eventId: IEvent['id']
  eventCategory: EVENT_CATEGORY_NAMES
}

export type CompanyEventsType = Record<IEvent['state'] | 'all', Array<IEvent>>

export type UserEventsType = Record<'upcoming' | 'past', Array<IEvent>>
