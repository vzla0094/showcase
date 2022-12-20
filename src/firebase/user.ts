import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from './config'

import { IGeolocation, IUser, IUserDetailsField } from '../types'

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
