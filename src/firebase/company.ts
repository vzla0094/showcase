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

import { emptyCompany, ICompany, IEvent, IUser } from '../types'
import { handleError } from '../helpers/errors'

export const FBInitializeCompany = async (
  companyRef: IUser['companyRef']
): Promise<ICompany> => {
  // Hydrates company redux state from firebase data
  if (!companyRef) return companyInitialState
  try {
    // Hydrate redux state with existing company data from firebase
    const companySnap = await getDoc(companyRef)

    const data = companySnap.data() as ICompany

    return { ...companyInitialState, ...data }
  } catch (e) {
    throw handleError('Error initializing company: ', e)
  }
}
export const FBCreateCompany = async (uid: IUser['uid']): Promise<ICompany> => {
  try {
    // Adds a new company document with a generated id
    const companyRef = await doc(collection(db, 'companies'))
    const generatedCompanyId = companyRef.id

    // Adds initial data shape to company document including new generated id
    const newCompanyData = {
      ...emptyCompany,
      companyId: generatedCompanyId,
    }

    await setDoc(companyRef, newCompanyData)

    const userRef = doc(db, 'users', uid)
    await updateDoc(userRef, {
      company: companyRef,
    })

    return newCompanyData
  } catch (e) {
    throw handleError('Error creating company: ', e)
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
    throw handleError('Error setting company: ', e)
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
    throw handleError('Error adding event to company: ', e)
  }
}
