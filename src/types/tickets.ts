import { IUser } from './user'
import { EVENT_CATEGORY_NAMES, IEvent } from './events'

export interface ITicket {
  id: string
  userId: IUser['uid']
  userName: IUser['details']['username']
  eventId: IEvent['id']
  eventCategory: IEvent['category']
  ticketTypeId: ITicketType['id']
  state: 'reserved' | 'redeemed'
  reservedTimeStamp: string
  redeemedTimeStamp: string
}

export interface ITicketType {
  id: string
  eventId: IEvent['id']
  eventCategory: IEvent['category']
  name: string
  description: string
  quantity: number
  sold: number
  available: number
  price: number
  minTicketsPerOrder: number
  maxTicketsPerOrder: number
}

export const emptyTicket: ITicket = {
  id: '',
  userId: '',
  userName: '',
  eventId: '',
  ticketTypeId: '',
  eventCategory: EVENT_CATEGORY_NAMES.Food,
  state: 'reserved',
  reservedTimeStamp: '',
  redeemedTimeStamp: '',
}

export const emptyTicketType: ITicketType = {
  id: '',
  eventId: '',
  eventCategory: EVENT_CATEGORY_NAMES.Food,
  name: '',
  description: '',
  quantity: 0,
  sold: 0,
  available: 0,
  price: 0,
  minTicketsPerOrder: 1,
  maxTicketsPerOrder: 0,
}

export enum TICKET_TYPE_FORM_FIELDS {
  Name = 'name',
  Description = 'description',
  Quantity = 'quantity',
  Price = 'price',
  MinTicketsPerOrder = 'minTicketsPerOrder',
  MaxTicketsPerOrder = 'maxTicketsPerOrder',
}

export type TicketTypeFormValuesType = Omit<
  ITicketType,
  'id' | 'eventId' | 'sold' | 'available' | 'eventCategory'
>

export interface IEditTicketTypePayload {
  prevTicketType: ITicketType
  newTicketType: ITicketType
}

export interface ITicketOrder {
  eventCategory: ITicketType['eventCategory']
  eventId: ITicketType['eventId']
  ticketTypeId: ITicketType['id']
  minTicketsPerOrder: ITicketType['minTicketsPerOrder']
  maxTicketsPerOrder: ITicketType['maxTicketsPerOrder']
  amount: number
}
