import { useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app'
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
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
import { emptyEvent } from './src/redux/slices/events'
import { userInitialState } from './src/redux/slices/user'

import {
  EVENT_CATEGORIES,
  ICompany,
  IEditEventPayload,
  IEvent,
  IInitializeCompanyData,
  IUser,
  IUserDetailsField,
} from './src/types'

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
  const dispatch = useAppDispatch()

  useEffect(() => {
    return onAuthStateChanged(auth, async fbUser => {
      if (fbUser) {
        // user hydration
        const user = await getUser(fbUser.uid)
        dispatch(actions.user.setUser(user))

        // company hydration
        dispatch(
          initializeCompany({
            companyId: user.company?.id || '',
          })
        )

        setAuthenticated(true)
      } else {
        dispatch(actions.user.resetUser())
        setAuthenticated(false)
      }
    })
  }, [])

  return authenticated
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
    const eventRef = await doc(collection(db, 'events'))
    const generatedEventId = eventRef.id

    // Adds initial data shape to the  event document including
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

export const FBEditEvent = async (
  editEventPayload: IEditEventPayload
): Promise<IEditEventPayload> => {
  const { id, data } = editEventPayload
  try {
    const eventRef = doc(db, 'events', id)

    await updateDoc(eventRef, data)

    return editEventPayload
  } catch (e) {
    console.error('Error creating event: ', e)

    return e
  }
}

export const FBGetEvent = async (eventId: IEvent['id']): Promise<IEvent> => {
  try {
    const eventSnap = await getDoc(doc(db, 'events', eventId))

    return eventSnap.data() as IEvent
  } catch (e) {
    console.error('Error getting event: ', e)

    return e
  }
}

export const useEvents = () => {
  const dispatch = useAppDispatch()

  // all events observer
  useEffect(() => {
    return onSnapshot(collection(db, 'events'), snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type === 'added') {
          const data = change.doc.data() as IEvent
          dispatch(actions.events.addEvent(data))
        }
        if (change.type === 'modified') {
          const data = change.doc.data() as IEvent
          dispatch(actions.events.editEvent(data))
        }
        if (change.type === 'removed') {
          const data = change.doc.data() as IEvent
          dispatch(actions.events.removeEvent(data))
        }
      })
    })
  }, [])

  // categories observers, TODO: see if this can be simplified (DRY)
  useEventCategory(EVENT_CATEGORIES.Food)
  useEventCategory(EVENT_CATEGORIES.Activities)
  useEventCategory(EVENT_CATEGORIES.Events)
  useEventCategory(EVENT_CATEGORIES.Accommodation)
  useEventCategory(EVENT_CATEGORIES.Transportation)
}

const useEventCategory = (category: EVENT_CATEGORIES) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const q = query(
      collection(db, 'events'),
      where('category', '==', category),
      where('state', '==', 'published')
    )
    return () => {
      onSnapshot(q, snapshot => {
        snapshot.docChanges().forEach(change => {
          if (change.type === 'added') {
            const data = change.doc.data() as IEvent
            dispatch(actions.events.addEventCategory(data))
          }
          if (change.type === 'modified') {
            const data = change.doc.data() as IEvent
            dispatch(actions.events.editEventCategory(data))
          }
          if (change.type === 'removed') {
            const data = change.doc.data() as IEvent
            dispatch(actions.events.removeEventCategory(data))
          }
        })
      })
    }
  })
}
