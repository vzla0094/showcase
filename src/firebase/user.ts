import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from './config'

import {
  IGeolocation,
  IUser,
  IUserDetailsField,
  IUserEventDataRef,
  SearchFilterSettingsField,
} from '../types'

export const setUser = async (user: IUser): Promise<IUser> => {
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

export const FBSetSearchFilterSettings = async (
  uid: IUser['uid'],
  searchFilterSettingsField: SearchFilterSettingsField
): Promise<SearchFilterSettingsField> => {
  const { fieldKey, value } = searchFilterSettingsField
  try {
    await updateDoc(doc(db, 'users', uid), {
      [`searchFilterSettings.${fieldKey}`]: value,
    })

    return searchFilterSettingsField
  } catch (e) {
    console.error('Error setting search filter setting: ', e)

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

export const FBUpdateUserEventsDataRefs = async (
  uid: IUser['uid'],
  newUserEventDataRef: IUserEventDataRef
): Promise<Array<IUserEventDataRef>> => {
  try {
    const userSnap = await getDoc(doc(db, 'users', uid))
    const { eventsDataRefs } = userSnap.data() as IUser

    const newEventsDataRefs = [...eventsDataRefs]

    // Check if the new event data ref already exists in the array
    const userEventIndex = newEventsDataRefs.findIndex(
      eventDataRef => eventDataRef.eventId === newUserEventDataRef.eventId
    )

    // If the user event already exists, update its ticket count
    if (userEventIndex !== -1) {
      newEventsDataRefs[userEventIndex].ticketCount +=
        newUserEventDataRef.ticketCount
    }
    // If the event does not exist, add it to the array
    else {
      newEventsDataRefs.push(newUserEventDataRef)
    }

    await updateDoc(doc(db, 'users', uid), {
      eventsDataRefs: newEventsDataRefs,
    })

    return newEventsDataRefs
  } catch (e) {
    console.error('Error adding user event: ', e)

    return e
  }
}
