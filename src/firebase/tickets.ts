import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
import { db } from './config'

import { categoryPathMap, IEvent, ITicket, ITicketType } from '../types'

export const FBCreateTicketType = async (
  ticketType: ITicketType
): Promise<ITicketType> => {
  const ticketTypesPath = `${categoryPathMap[ticketType.eventCategory]}/${
    ticketType.eventId
  }/ticketTypes`

  try {
    // Adds a new ticketType document with a generated id
    const ticketTypeRef = await doc(collection(db, ticketTypesPath))
    const generatedTicketTypeId = ticketTypeRef.id

    // Adds initial data shape to the ticketType document including
    // new generated id and company ref
    const data: ITicketType = {
      ...ticketType,
      id: generatedTicketTypeId,
    }
    await setDoc(ticketTypeRef, data)

    return data
  } catch (e) {
    console.error('Error creating ticketType: ', e)

    return e
  }
}

export const FBEditTicketType = async (
  ticketType: ITicketType
): Promise<ITicketType> => {
  const ticketTypesPath = `${categoryPathMap[ticketType.eventCategory]}/${
    ticketType.eventId
  }/ticketTypes`

  try {
    await setDoc(doc(db, ticketTypesPath, ticketType.id), ticketType)

    return ticketType
  } catch (e) {
    console.error('Error editing ticketType: ', e)

    return e
  }
}

export const FBGetEventTicketTypes = async (
  eventId: IEvent['id'],
  eventCategory: IEvent['category']
): Promise<Array<ITicketType>> => {
  const ticketTypesPath = `${categoryPathMap[eventCategory]}/${eventId}/ticketTypes`

  try {
    const snapshot = await getDocs(collection(db, ticketTypesPath))

    return snapshot.docs.map(doc => doc.data()) as Array<ITicketType>
  } catch (e) {
    console.error('Error getting ticketTypes: ', e)

    return e
  }
}

// function to get tickets from the tickets sub collection inside the event document, similar to FBGetEventTicketTypes
export const FBGetEventTickets = async (
  eventId: IEvent['id'],
  eventCategory: IEvent['category']
): Promise<Array<ITicket>> => {
  const ticketsPath = `${categoryPathMap[eventCategory]}/${eventId}/tickets`

  try {
    const snapshot = await getDocs(collection(db, ticketsPath))

    return snapshot.docs.map(doc => doc.data()) as Array<ITicket>
  } catch (e) {
    console.error('Error getting tickets: ', e)

    return e
  }
}

export const FBRedeemTicket = async (ticket: ITicket): Promise<ITicket> => {
  // TODO: add validations
  const ticketsPath = `${categoryPathMap[ticket.eventCategory]}/${
    ticket.eventId
  }/tickets`

  try {
    await setDoc(doc(db, ticketsPath, ticket.id), { state: 'redeemed' })

    return ticket
  } catch (e) {
    console.error('Error redeeming ticket: ', e)

    return e
  }
}
