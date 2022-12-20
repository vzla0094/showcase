import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'

import { companyInitialState } from '../redux/slices/company'

import { db } from './config'

import { ICompany, IEvent, IInitializeCompanyData, IUser } from '../types'

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
