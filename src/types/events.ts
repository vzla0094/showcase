import { ICompany } from './company'

export type ToggleButtonOnPress = (buttonValue: EVENT_CATEGORY_NAMES) => void

export enum EVENT_FORM_FIELD_NAMES {
  Name = 'name',
  Description = 'description',
  Address = 'address',
  Category = 'category',
  State = 'state',
}

export type EventFormValuesType = {
  [key in EVENT_FORM_FIELD_NAMES]: string
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
  category: EVENT_CATEGORY_NAMES
  address: string
  state: 'draft' | 'published' | 'expired'
  description: string
  startDateTime: string
  endDateTime: string
  ticketCount: number
  ticketLimit: number
  tickets: Array<ITicket>
  timeSlots: []
}

export interface IFirebaseInputField<FieldKeys, FieldValue> {
  fieldKey: FieldKeys
  value: FieldValue
}

export type handleEventPressType = (values: {
  id: IEvent['id']
  category: IEvent['category']
}) => void

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
}

export interface IEventProps {
  name: string
  description: string
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
  address: '',
  description: '',
  startDateTime: '',
  endDateTime: '',
  ticketCount: 0,
  ticketLimit: 0,
  tickets: [],
  timeSlots: [],
}
