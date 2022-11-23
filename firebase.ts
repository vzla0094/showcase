import { initializeApp } from 'firebase/app'
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  getDocs as FBGetDocs,
  getFirestore,
  query,
  setDoc,
  where,
  arrayUnion,
} from 'firebase/firestore'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import {
  DealCategoryNames,
  ICompany,
  IDeal,
  IInitializeCompanyData,
  ICompanyDetailsPayload,
  IUser,
  IUserDetailsField,
  ICompanyDetailsField,
  IEvent,
  IEditEventPayload,
} from './src/types'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './src/hooks'
import { actions } from './src/redux/slices'
import {
  initializeCompany,
  companyInitialState,
} from './src/redux/slices/company'
import { userInitialState } from './src/redux/slices/user'
import { emptyEvent } from './src/redux/slices/events'

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

// Deals
const getDocs = async (query: any) => {
  try {
    const docs: Array<unknown> = []
    const querySnapshot = await FBGetDocs(query)
    querySnapshot.forEach(doc => {
      docs.push(doc.data())
    })
    return docs
  } catch (e) {
    console.error('Error getting documents: ', e)
  }
}

export const createDeal = async (dealWithoutId: IDeal) => {
  try {
    // Add a new document with a generated id
    const newDealRef = doc(collection(db, 'deals'))

    // Add the firebase generated id to the deal
    const dealWithId: IDeal = { ...dealWithoutId, dealId: newDealRef.id }

    // Save deal with ID
    await setDoc(newDealRef, dealWithId)

    return [dealWithId, null]
  } catch (e) {
    console.error('Error setting deal: ', e)

    return [null, e]
  }
}

export const getActiveDeals = async (
  activeDealCategories: Array<DealCategoryNames>
) => {
  try {
    const activeDealsQuery = query(
      collection(db, 'deals'),
      where('category', 'in', activeDealCategories)
    )
    const data = await getDocs(activeDealsQuery)

    return [data, null]
  } catch (e) {
    console.error('Error getting active deals: ', e)

    return [null, e]
  }
}

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
            uid: fbUser.uid,
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
  uid,
}: IInitializeCompanyData): Promise<ICompany> => {
  // Hydrates company redux state from firebase data
  // Creates a new company document and generates companyId
  // Updates company document with generated companyId
  try {
    if (companyId) {
      // Hydrate redux state with existing company data from firebase
      const companySnap = await getDoc(doc(db, 'companies', companyId))

      return companySnap.data() as ICompany
    }

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
    console.error('Error initializing company', e)

    return e
  }
}

export const FBSetCompanyDetails = async (
  companyId: ICompany['companyId'],
  { detailSection, companyDetailsField }: ICompanyDetailsPayload
): Promise<ICompanyDetailsField> => {
  const { fieldKey, value } = companyDetailsField
  try {
    const companyRef = doc(db, 'companies', companyId)

    if (detailSection) {
      await updateDoc(companyRef, {
        [`${detailSection}.${fieldKey}`]: value,
      })

      return companyDetailsField
    }

    await updateDoc(companyRef, { [fieldKey]: value })

    return companyDetailsField
  } catch (e) {
    console.error('Error setting company contact information: ', e)

    return e
  }
}

// Event
export const FBCreateEvent = async (
  companyId: ICompany['companyId']
): Promise<IEvent> => {
  try {
    const companyRef = doc(db, 'companies', companyId)

    // Adds a new event document with a generated id
    const eventRef = await doc(collection(db, 'events'))
    const generatedEventId = eventRef.id

    // Adds initial data shape to the  event document including
    // new generated id and company ref
    const newEventData = {
      ...emptyEvent,
      id: generatedEventId,
      company: companyRef,
    }
    await setDoc(eventRef, newEventData)

    // Adds the event document reference to company.events
    await updateDoc(companyRef, {
      events: arrayUnion(eventRef),
    })

    return newEventData
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
