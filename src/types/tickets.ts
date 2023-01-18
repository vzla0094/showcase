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
  ticketsPerOrder: {
    min: number
    max: number
  }
}
