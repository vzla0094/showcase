import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

import { db } from './config'

import {
  categoryNamesArr,
  categoryPathMap,
  emptyEvent,
  EVENT_CATEGORY_NAMES,
  ICompany,
  IEvent,
} from '../types'

export const FBCreateEvent = async (
  companyId: ICompany['companyId']
): Promise<IEvent> => {
  try {
    // Adds a new event document with a generated id
    const eventRef = await doc(collection(db, 'eventsFood'))
    const generatedEventId = eventRef.id

    // Adds initial data shape to the event document including
    // new generated id and company ref
    const data = {
      ...emptyEvent,
      id: generatedEventId,
      company: companyId,
    }
    await setDoc(eventRef, data)

    return data
  } catch (e) {
    console.error('Error creating event: ', e)

    return e
  }
}
export const useEvents = () =>
  categoryNamesArr.map(categoryName => useEventCategoryObserver(categoryName))
export const useEventCategoryObserver = (
  categoryName: EVENT_CATEGORY_NAMES
) => {
  const [events, setEvents] = useState<Array<IEvent>>([])

  useFocusEffect(
    useCallback(() => {
      const path = categoryPathMap[categoryName]
      const q = query(collection(db, path), where('state', '==', 'published'))

      const unsubscribe = onSnapshot(q, snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data() as IEvent

            setEvents(prevState => [...prevState, data])
          }
          if (change.type === 'modified') {
            const data = change.doc.data() as IEvent

            setEvents(prevState =>
              prevState.map(event => (event.id === data.id ? data : event))
            )
          }
          if (change.type === 'removed') {
            const data = change.doc.data() as IEvent

            setEvents(prevState =>
              prevState.filter(event => event.id !== data.id)
            )
          }
        })
      })

      return () => {
        setEvents([])
        unsubscribe()
      }
    }, [])
  )

  return { name: categoryName, events }
}
export const FBGetEvent = async (
  eventId: IEvent['id'],
  category: IEvent['category']
): Promise<IEvent> => {
  const path = categoryPathMap[category]
  try {
    const eventSnap = await getDoc(doc(db, path, eventId))

    return eventSnap.data() as IEvent
  } catch (e) {
    console.error('Error getting event: ', e)

    return e
  }
}
export const FBGetCompanyEvents = async (
  companyId: ICompany['companyId']
): Promise<Array<IEvent>> => {
  const companyEvents: Array<IEvent> = []

  await Promise.all(
    categoryNamesArr.map(async categoryName => {
      const path = categoryPathMap[categoryName]

      const q = query(collection(db, path), where('company', '==', companyId))

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(doc => {
        const data = doc.data() as IEvent
        companyEvents.push(data)
      })
    })
  )

  return companyEvents
}
export const FBSetEventDetails = async (
  prevEvent: IEvent,
  newEvent: IEvent
) => {
  try {
    if (prevEvent.category === newEvent.category) {
      const path = categoryPathMap[newEvent.category]
      await setDoc(doc(db, path, newEvent.id), newEvent)

      return newEvent
    }

    // Logic to change event category
    const prevPath = categoryPathMap[prevEvent.category]
    const newPath = categoryPathMap[newEvent.category]

    // remove event from previous event category collection
    const prevEventRef = doc(db, prevPath, prevEvent.id)
    await deleteDoc(prevEventRef)

    // add event to new event category collection
    await setDoc(doc(db, newPath, newEvent.id), newEvent)

    return newEvent
  } catch (e) {
    console.error('Error setting event details: ', e)

    return e
  }
}
