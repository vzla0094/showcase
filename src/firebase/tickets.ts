import {
  collection,
  doc,
  getDocs,
  increment,
  query,
  QueryFieldFilterConstraint,
  runTransaction,
  setDoc,
  updateDoc,
  where,
  writeBatch,
  WriteBatch,
} from 'firebase/firestore'
import { WhereFilterOp } from '@firebase/firestore-types'
import { db } from './config'

import { AppDispatch } from '../redux/store'
import { addUserEvent } from '../redux/slices/user'

import {
  categoryPathMap,
  IEvent,
  ITicket,
  ITicketOrder,
  ITicketType,
  UserEvent,
} from '../types'

export const FBCreateTicketType = async (
  ticketType: ITicketType
): Promise<ITicketType> => {
  const eventPath = `${categoryPathMap[ticketType.eventCategory]}/${
    ticketType.eventId
  }`

  try {
    // Adds a new ticketType document with a generated id
    const ticketTypeRef = await doc(collection(db, `${eventPath}/ticketTypes`))
    const generatedTicketTypeId = ticketTypeRef.id

    // Adds initial data shape to the ticketType document including
    // new generated id and company ref
    const data: ITicketType = {
      ...ticketType,
      id: generatedTicketTypeId,
    }
    await setDoc(ticketTypeRef, data)

    // update the event document ticketLimit
    const eventRef = doc(db, eventPath)
    await updateDoc(eventRef, { ticketLimit: increment(ticketType.quantity) })

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

/**
 * Process ticket orders by ...
 * - validating ticket quantities
 * - generating tickets
 * - updating ticket quantities
 * - adding userEvent to the user document
 *
 * @param {Array} ticketOrders - An array of ticket orders
 * @param {Function} dispatch - A Redux dispatch function
 *
 * @returns {Promise}
 */
export const FBProcessTicketOrders = async (
  ticketOrders: Array<ITicketOrder>,
  dispatch: AppDispatch
): Promise<void> => {
  try {
    const ticketsBatch = writeBatch(db)

    const userEvent: UserEvent = {
      eventId: ticketOrders[0].eventId,
      eventCategory: ticketOrders[0].eventCategory,
    }

    await Promise.all(
      ticketOrders.map(ticketOrder =>
        validateTicketQuantities(ticketsBatch, ticketOrder)
      )
    )

    // add new tickets to /tickets sub collection
    await ticketsBatch.commit()

    // add userEvent to the user document
    await dispatch(addUserEvent(userEvent))
  } catch (e) {
    throw new Error(e)
  }
}

/**
 * Validate ticket quantities and generate tickets for each order.
 *
 * @param {WriteBatch} ticketsBatch - The Firestore tickets batch
 * @param {ITicketOrder} ticketOrder - The ticket order to validate
 *
 * @returns {Promise}
 */
const validateTicketQuantities = async (
  ticketsBatch: WriteBatch,
  ticketOrder: ITicketOrder
): Promise<void> => {
  const { eventId, eventCategory, ticketTypeId } = ticketOrder

  const eventPath = `${categoryPathMap[eventCategory]}/${eventId}`

  await runTransaction(db, async transaction => {
    // This feature ensures that the transaction runs on up-to-date and consistent data.
    // https://firebase.google.com/docs/firestore/manage-data/transactions#transactions

    const ticketTypeRef = doc(db, `${eventPath}/ticketTypes`, ticketTypeId)

    const ticketTypeSnapshot = await transaction.get(ticketTypeRef)

    const availableCount = ticketTypeSnapshot.data()?.available

    if (availableCount < ticketOrder.amount) {
      throw new Error(`Only ${availableCount} tickets available`)
    }

    // update available tickets on the ticket type document
    transaction.update(ticketTypeRef, {
      available: increment(-ticketOrder.amount),
      sold: increment(ticketOrder.amount),
    })

    // update ticket count on the event document
    transaction.update(doc(db, eventPath), {
      ticketCount: increment(ticketOrder.amount),
    })

    // generate new tickets
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
    }
  })
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
