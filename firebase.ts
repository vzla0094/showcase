import { useCallback, useEffect, useState } from 'react'

import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location'
import { geohashForLocation } from 'geofire-common'

import { initializeApp } from 'firebase/app'
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { useAppDispatch } from './src/hooks'
import { actions } from './src/redux/slices'
import {
  companyInitialState,
  initializeCompany,
} from './src/redux/slices/company'
import { setUserGeoLocation, userInitialState } from './src/redux/slices/user'

import {
  categoryNamesArr,
  categoryPathMap,
  emptyEvent,
  EVENT_CATEGORY_NAMES,
  ICompany,
  IEvent,
  IGeolocation,
  IInitializeCompanyData,
  IUseLocationRequest,
  IUser,
  IUserDetailsField,
  StatusIUserLocation,
} from './src/types'
import { useFocusEffect } from '@react-navigation/native'

const firebaseConfig = {
  apiKey: 'AIzaSyAhWL-VE6px-42zW-veEUddTpIstjtxzJM',
  authDomain: 'taisho-25387.firebaseapp.com',
  projectId: 'taisho-25387',
  storageBucket: 'taisho-25387.appspot.com',
  messagingSenderId: '434187994962',
  appId: '1:434187994962:web:bbd5f2e29584bba7279c8b',
  measurementId: 'G-HM2D33LP17',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Authentication
const auth = getAuth()

export const FBRegister = async (email: string, password: string) => {
  try {
    const { user: FBUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    return await setUser({
      ...userInitialState,
      uid: FBUser.uid,
    })
  } catch (e) {
    console.error('Error registering : ', e)

    return e
  }
}

export const FBLogin = async (email: string, password: string) => {
  try {
    const { user: FBUser } = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return await getUser(FBUser.uid)
  } catch (e) {
    console.error('Error logging in: ', e)

    return e
  }
}

// Users
export const setUser = async (user: IUser) => {
  try {
    await setDoc(doc(db, 'users', user.uid), user)

    return user
  } catch (e) {
    console.error('Error setting user: ', e)

    return e
  }
}

export const FBSetUserGeoLocation = async (
  geolocation: IGeolocation,
  uid: IUser['uid']
): Promise<IGeolocation> => {
  try {
    await updateDoc(doc(db, 'users', uid), { geolocation })

    return geolocation
  } catch (e) {
    console.error('Error setting user data', e)

    return e
  }
}

export const FBSetUserDetail = async (
  uid: IUser['uid'],
  userDetailsField: IUserDetailsField
): Promise<IUserDetailsField> => {
  const { fieldKey, value } = userDetailsField
  try {
    await updateDoc(doc(db, 'users', uid), {
      [`details.${fieldKey}`]: value,
    })

    return userDetailsField
  } catch (e) {
    console.error('Error setting user details: ', e)

    return e
  }
}

export const getUser = async (userId: IUser['uid']) => {
  try {
    const userSnap = await getDoc(doc(db, 'users', userId))
    return userSnap.data()
  } catch (e) {
    console.error('Error getting user: ', e)

    return e
  }
}

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return onAuthStateChanged(auth, async fbUser => {
      if (fbUser) {
        // user hydration
        const user = await getUser(fbUser.uid)
        dispatch(actions.user.setUser(user))

        // user location
        dispatch(setUserGeoLocation())

        // company hydration
        dispatch(
          initializeCompany({
            companyId: user.company?.id || '',
          })
        )

        setAuthenticated(true)
        setLoading(false)
      } else {
        dispatch(actions.user.resetUser())
        setAuthenticated(false)
        setLoading(false)
      }
    })
  }, [])

  return { authenticated, loading }
}

// Company
export const FBInitializeCompany = async ({
  companyId,
}: IInitializeCompanyData): Promise<ICompany> => {
  // Hydrates company redux state from firebase data
  if (!companyId) return companyInitialState
  try {
    // Hydrate redux state with existing company data from firebase
    const companySnap = await getDoc(doc(db, 'companies', companyId))

    return companySnap.data() as ICompany
  } catch (e) {
    console.error('Error initializing company', e)

    return e
  }
}

export const FBCreateCompany = async (uid: IUser['uid']) => {
  try {
    // Adds a new company document with a generated id
    const companyRef = await doc(collection(db, 'companies'))
    const generatedCompanyId = companyRef.id

    // Adds initial data shape to company document including new generated id
    const newCompanyData = {
      ...companyInitialState,
      companyId: generatedCompanyId,
    }
    await setDoc(companyRef, newCompanyData)

    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      company: companyRef,
    })

    return newCompanyData
  } catch (e) {
    console.error('Error creating company', e)

    return e
  }
}

export const FBSetCompany = async (
  companyId: ICompany['companyId'],
  payload: Partial<ICompany>
): Promise<Partial<ICompany>> => {
  try {
    const companyRef = doc(db, 'companies', companyId)

    await updateDoc(companyRef, payload)

    return payload
  } catch (e) {
    console.error('Error setting company contact information: ', e)

    return e
  }
}

export const FBAddEvent = async (
  companyId: ICompany['companyId'],
  eventId: IEvent['id']
): Promise<IEvent['id']> => {
  // Adds the event document reference to company.events
  try {
    const companyRef = doc(db, 'companies', companyId)

    await updateDoc(companyRef, {
      events: arrayUnion(eventId),
    })

    return eventId
  } catch (e) {
    console.error('Error adding event to company: ', e)

    return e
  }
}

// Event
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

// Location
export const requestPermissionsAsync =
  async (): Promise<IUseLocationRequest> => {
    try {
      const { status } = await requestForegroundPermissionsAsync()

      if (status !== 'granted') {
        return {
          status: StatusIUserLocation.denied,
          description: 'Permission to access location was denied',
          variant: 'error',
        }
      }

      const {
        coords: { latitude, longitude, accuracy },
      } = await getCurrentPositionAsync({})

      if (latitude && longitude) {
        const geoHash = geohashForLocation([latitude, longitude])

        return {
          status: StatusIUserLocation.allowed,
          geolocation: { latitude, longitude, accuracy, geoHash },
        }
      }

      return {
        status: StatusIUserLocation.init,
      }
    } catch (e) {
      console.error(`Error: useLocation`, e)
      throw e
    }
  }
