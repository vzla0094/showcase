import { initializeApp } from 'firebase/app'
import {
  doc,
  setDoc,
  collection,
  getDocs as FBGetDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { DealCategoryNames, IDeal } from './src/types'

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

export const register = async (email: string, password: string) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    return [user, null]
  } catch (e) {
    console.error('Error signing up: ', e)

    return [null, e]
  }
}

export const login = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)

    return [user, null]
  } catch (e) {
    console.error('Error logging in: ', e)

    return [null, e]
  }
}
