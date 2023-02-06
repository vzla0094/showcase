import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  writeBatch,
  QueryFieldFilterConstraint,
  increment,
  runTransaction,
} from 'firebase/firestore'
import { WhereFilterOp } from '@firebase/firestore-types'
import { db } from './config'

import {
  categoryPathMap,
  IEvent,
  ITicket,
  ITicketOrder,
  ITicketType,
} from '../types'

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

interface EventTicketTypesConditional {
  key: keyof ITicketType
  operator: WhereFilterOp
  value: string | number | boolean // We don't want to filter by any value
}

export const FBGetEventTicketTypes = async (
  eventId: IEvent['id'],
  eventCategory: IEvent['category'],
  conditionals?: Array<EventTicketTypesConditional>
): Promise<Array<ITicketType>> => {
  const ticketTypesPath = `${categoryPathMap[eventCategory]}/${eventId}/ticketTypes`

  try {
    const whereConditionals: QueryFieldFilterConstraint[] = []

    if (conditionals) {
      conditionals.forEach(({ key, operator, value }) => {
        whereConditionals.push(where(key, operator, value))
      })
    }

    const q = query(collection(db, ticketTypesPath), ...whereConditionals)
    const snapshot = await getDocs(q)

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

export const FBProcessTicketOrder = async (
  ticketOrders: Array<ITicketOrder>
): Promise<Array<ITicket>> => {
  try {
    const ticketsBatch = writeBatch(db)

    const tickets: Array<ITicket> = []

    await Promise.all(
      ticketOrders.map(async ticketOrder => {
        const eventPath = `${categoryPathMap[ticketOrder.eventCategory]}/${
          ticketOrder.eventId
        }`

        // update available tickets on the ticket type document
        await runTransaction(db, async transaction => {
          // This feature ensures that the transaction runs on up-to-date and consistent data.
          // https://firebase.google.com/docs/firestore/manage-data/transactions#transactions

          const ticketTypeRef = doc(
            db,
            `${eventPath}/ticketTypes`,
            ticketOrder.ticketTypeId
          )

          const ticketTypeSnapshot = await transaction.get(ticketTypeRef)

          const availableCount = ticketTypeSnapshot.data()?.available

          if (availableCount < ticketOrder.amount) {
            throw new Error(`Only ${availableCount} tickets available`)
          }

          transaction.update(ticketTypeRef, {
            available: increment(-ticketOrder.amount),
            sold: increment(ticketOrder.amount),
          })

          // add ticket order tickets to /tickets sub collection
          for (let i = 0; i < ticketOrder.amount; i++) {
            const ticketRef = doc(collection(db, `${eventPath}/tickets`))
            const generatedTicketId = ticketRef.id

            const ticket: ITicket = {
              id: generatedTicketId,
              userId: ticketOrder.userId,
              userName: ticketOrder.userName,
              eventId: ticketOrder.eventId,
              eventCategory: ticketOrder.eventCategory,
              ticketTypeId: ticketOrder.ticketTypeId,
              state: 'reserved',
              reservedTimeStamp: new Date().toISOString(),
              redeemedTimeStamp: '',
            }

            ticketsBatch.set(ticketRef, ticket)

            tickets.push(ticket)
          }
        })
      })
    )

    await ticketsBatch.commit()

    return tickets
  } catch (e) {
    throw new Error(e)
  }
}

export const FBGetUserEventTickets = async (
  eventId: IEvent['id'],
  eventCategory: IEvent['category'],
  userId: string
): Promise<Array<ITicket>> => {
  const path = `${categoryPathMap[eventCategory]}/${eventId}/tickets`
  const _query = query(collection(db, path), where('userId', '==', userId))
  try {
    const snapshot = await getDocs(_query)

    return snapshot.docs.map(doc => doc.data()) as Array<ITicket>
  } catch (e) {
    console.error('Error getting tickets: ', e)

    return e
  }
}
