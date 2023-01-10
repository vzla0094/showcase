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
  limit,
} from 'firebase/firestore'

import { db } from './config'
import { isEventWithinRange } from './location'
import { useAppSelector } from '../hooks'

import {
  categoryNamesArr,
  categoryPathMap,
  emptyEvent,
  EVENT_CATEGORY_NAMES,
  ICompany,
  IEvent,
  IEventCategory,
} from '../types'

export const FBCreateEvent = async (
  companyId: ICompany['companyId'],
  newEvent: IEvent
): Promise<IEvent> => {
  const path = categoryPathMap[newEvent.category]

  try {
    // Adds a new event document with a generated id
    const eventRef = await doc(collection(db, path))
    const generatedEventId = eventRef.id

    // Adds initial data shape to the event document including
    // new generated id and company ref
    const data = {
      ...newEvent,
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

export const useEvents = () => {
  const eventsLimit = 3
  return categoryNamesArr.map(categoryName =>
    useEventCategoryObserver(categoryName, eventsLimit)
  )
}

export const useEventCategoryObserver = (
  categoryName: EVENT_CATEGORY_NAMES,
  eventsLimit?: number
): IEventCategory => {
  const [events, setEvents] = useState<Array<IEvent>>([])
  const user = useAppSelector(({ user }) => user)

  useFocusEffect(
    useCallback(() => {
      const path = categoryPathMap[categoryName]
      let q

      if (eventsLimit) {
        q = query(
          collection(db, path),
          where('state', '==', 'published'),
          limit(eventsLimit)
        )
      } else {
        q = query(collection(db, path), where('state', '==', 'published'))
      }

      const unsubscribe = onSnapshot(q, snapshot => {
        snapshot.docChanges().forEach(change => {
          // filter out event if it's not within range
          const data = change.doc.data() as IEvent
          const isWithinRange = isEventWithinRange({
            userLatitude: user.geolocation.latitude,
            userLongitude: user.geolocation.longitude,
            eventsRange: user.searchFilterSettings.radiusDistance,
            eventLatitude: data.latitude,
            eventLongitude: data.longitude,
          })
          if (!isWithinRange) return

          switch (change.type) {
            case 'added': {
              setEvents(prevState => [...prevState, data])
              break
            }
            case 'modified': {
              setEvents(prevState =>
                prevState.map(event => (event.id === data.id ? data : event))
              )
              break
            }
            case 'removed': {
              setEvents(prevState =>
                prevState.filter(event => event.id !== data.id)
              )
            }
          }
        })
      })

      return () => {
        setEvents([])
        unsubscribe()
      }
    }, [user])
  )

  return { name: categoryName, events, showMore: events.length === 3 }
}

export const useEvent = (
  eventId?: IEvent['id'],
  category?: IEvent['category']
) => {
  const [event, setEvent] = useState<IEvent>(emptyEvent)

  useFocusEffect(
    useCallback(() => {
      // only fetches if event is already created
      // otherwise it uses the initialized emptyEvent
      if (!eventId || !category) return

      const fetchEvent = async () => {
        const path = categoryPathMap[category]
        try {
          const eventSnap = await getDoc(doc(db, path, eventId))

          setEvent(eventSnap.data() as IEvent)
        } catch (e) {
          console.error('Error getting event: ', e)
        }
      }

      fetchEvent()

      return () => {
        setEvent(emptyEvent)
      }
    }, [eventId, category])
  )

  return event
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

export const FBEditEvent = async (prevEvent: IEvent, newEvent: IEvent) => {
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

export const FBDeleteEvent = async (event: IEvent) => {
  const path = categoryPathMap[event.category]
  try {
    const eventRef = doc(db, path, event.id)

    await deleteDoc(eventRef)
  } catch (e) {
    console.error('Error deleting event: ', e)

    return e
  }
}
