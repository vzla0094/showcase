import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore'

import { db } from './config'
import { isEventWithinRange } from './location'
import { saveImage } from './storage'
import { useAppSelector } from '../hooks'

import {
  categoryNamesArr,
  categoryPathMap,
  CompanyEventsType,
  emptyEvent,
  EVENT_CATEGORY_NAMES,
  ICompany,
  IEvent,
  IEventCategory,
  IUser,
  UserEventsType,
} from '../types'
import { handleError } from '../helpers/errors'

export const FBCreateEvent = async (
  companyId: ICompany['companyId'],
  newEvent: IEvent
): Promise<IEvent> => {
  const path = categoryPathMap[newEvent.category]

  try {
    // Adds a new event document with a generated id
    const eventRef = await doc(collection(db, path))
    const generatedEventId = eventRef.id

    const newImageUri = await saveImage(
      newEvent.image.uri,
      `events/${generatedEventId}`
    )

    // Adds initial data shape to the event document including
    // new generated id and company ref
    const data = {
      ...newEvent,
      id: generatedEventId,
      company: companyId,
      image: {
        uri: newImageUri,
        alt: newEvent.name,
      },
    }
    await setDoc(eventRef, data)

    return data
  } catch (e) {
    throw handleError('Error creating event: ', e)
  }
}

export const useEvents = () => {
  const eventsLimit = 3
  return categoryNamesArr.map(categoryName =>
    useEventCategoryObserver(categoryName)
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
          // TODO: add filter for events with available tickets
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

export const FBGetEvent = async (
  eventId: IEvent['id'],
  category: IEvent['category']
): Promise<IEvent> => {
  const path = categoryPathMap[category]
  try {
    const eventSnap = await getDoc(doc(db, path, eventId))

    return eventSnap.data() as IEvent
  } catch (e) {
    throw handleError('Error getting event: ', e)
  }
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
        const data = await FBGetEvent(eventId, category)
        setEvent(data)
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
): Promise<CompanyEventsType> => {
  const companyEvents: CompanyEventsType = {
    published: [],
    draft: [],
    expired: [],
    all: [],
  }

  await Promise.all(
    categoryNamesArr.map(async categoryName => {
      const path = categoryPathMap[categoryName]

      const q = query(collection(db, path), where('company', '==', companyId))

      const querySnapshot = await getDocs(q)

      querySnapshot.forEach(doc => {
        const data = doc.data() as IEvent
        companyEvents[data.state].push(data)
        companyEvents.all.push(data)
      })
    })
  )

  return companyEvents
}

export const FBEditEvent = async (prevEvent: IEvent, newEvent: IEvent) => {
  try {
    // Check if the image has been updated
    if (prevEvent.image.uri !== newEvent.image.uri) {
      const newImageDownloadURL = await saveImage(
        newEvent.image.uri,
        `events/${newEvent.id}`
      )
      newEvent.image.uri = newImageDownloadURL
    }

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

export const FBGetUserEvents = async (
  userId: IUser['uid'],
  eventsDataRefs: IUser['eventsDataRefs']
): Promise<UserEventsType> => {
  try {
    const userEvents: UserEventsType = {
      upcoming: [],
      past: [],
    }

    await Promise.all(
      eventsDataRefs.map(async ({ eventRef }) => {
        const eventSnap = await getDoc(eventRef)

        const data = eventSnap.data() as IEvent

        if (data.state === 'published') {
          userEvents.upcoming.push(data)
        }
        if (data.state === 'expired') {
          userEvents.past.push(data)
        }
      })
    )

    return userEvents
  } catch (e) {
    throw handleError('Error getting user events: ', e)
  }
}

export const useUserEvents = (
  userId: IUser['uid'],
  eventsDataRefs: IUser['eventsDataRefs']
) => {
  const initialUserEvents: UserEventsType = {
    upcoming: [],
    past: [],
  }
  const [userEvents, setUserEvents] =
    useState<UserEventsType>(initialUserEvents)
  const [loading, setLoading] = useState<boolean>(true)

  useFocusEffect(
    useCallback(() => {
      const fetchEvents = async () => {
        const data = await FBGetUserEvents(userId, eventsDataRefs)
        setUserEvents(data)
        setLoading(false)
      }

      fetchEvents()

      return () => {
        setUserEvents(initialUserEvents)
        setLoading(true)
      }
    }, [userId, eventsDataRefs])
  )

  return { userEvents, loading }
}
