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
  ICompanyAddressField,
  ICompanyContactField,
  ICompanyNameField,
  IDeal,
  IUser,
  IUserField,
} from './src/types'
import { useEffect, useState } from 'react'
import { useAppDispatch } from './src/hooks'
import { actions } from './src/redux/slices'

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
      uid: FBUser.uid,
      details: {
        username: '',
        birthDay: '',
        birthMonth: '',
        birthYear: '',
        phoneNumber: '',
      },
      companyInfo: {
        companyId: '',
        companyName: '',
        deals: [],
      },
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
  userField: IUserField
): Promise<IUserField> => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      [`details.${userField.fieldKey}`]: userField.value,
    })

    return userField
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
        const user = await getUser(fbUser.uid)
        dispatch(actions.user.setUser(user))
        dispatch(initializeCompany())
        setAuthenticated(true)
      } else {
        dispatch(actions.user.resetUser())
        setAuthenticated(false)
      }
    })
  }, [])

  return authenticated
}

// Creates a new company document and generates companyId.
// Updates company document and user document with generated companyId
export const FBInitializeCompany = async (
  companyId: ICompany['companyId'],
  uid: IUser['uid']
): Promise<ICompany['companyId']> => {
  try {
    if (companyId) return companyId

    // Adds a new company document with a generated id
    const companyRef = await doc(collection(db, 'companies'))
    const generatedCompanyId = companyRef.id

    // Adds initial data shape to company document including new generated id
    await setDoc(companyRef, { ...initialState, companyId: generatedCompanyId })

    // Adds companyId to user.companyInfo
    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, { [`companyInfo.companyId`]: generatedCompanyId })

    return generatedCompanyId
  } catch (e) {
    console.error('Error initializing company', e)

    return e
  }
}

// company
export const FBSetCompanyName = async (
  companyId: ICompany['companyId'],
  companyField: ICompanyNameField
): Promise<ICompanyNameField> => {
  try {
    console.log('setCompanyName', { companyField, companyId })

    return companyField
  } catch (e) {
    console.error('Error setting company name')

    return e
  }
}

export const FBSetCompanyAddress = async (
  companyId: ICompany['companyId'],
  companyAddress: ICompanyAddressField
): Promise<ICompanyAddressField> => {
  try {
    console.log('setCompanyAddress', { companyAddress, companyId })

    return companyAddress
  } catch (e) {
    console.error('Error setting company address: ', e)

    return e
  }
}

export const FBSetCompanyContactInfo = async (
  companyId: ICompany['companyId'],
  companyContactInfo: ICompanyContactField
): Promise<ICompanyContactField> => {
  try {
    console.log('setCompanyContactInfo', { companyContactInfo, companyId })

    return companyContactInfo
  } catch (e) {
    console.error('Error setting company contact information: ', e)

    return e
  }
}
