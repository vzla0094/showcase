import { IUser } from './user'
import { IEvent } from './events'

export interface ITicket {
  id: string
  userId: IUser['uid']
  userName: IUser['details']['username']
  eventId: IEvent['id']
  ticketTypeId: ITicketType['id']
  state: 'reserved' | 'redeemed'
  reservedTimeStamp: string
  redeemedTimeStamp: string
}

export interface ITicketType {
  id: string
  eventId: string
  name: string
  description: string
  quantity: number
  sold: number
  available: number
  price: number
  minTicketsPerOrder: number
  maxTicketsPerOrder: number
}

export const emptyTicketType: ITicketType = {
  id: '',
  eventId: '',
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
  'id' | 'eventId' | 'sold' | 'available'
>
