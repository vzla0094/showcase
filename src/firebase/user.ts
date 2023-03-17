import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'

import { db } from './config'
import { handleError } from '../helpers/errors'

import {
  IGeolocation,
  IUser,
  IUserEventDataRef,
  SearchFilterSettingsField,
  StatusIUserLocation,
} from '../types'
import { requestPermissionsAsync } from './location'

export const setUser = async (user: IUser): Promise<IUser> => {
  try {
    await setDoc(doc(db, 'users', user.uid), user)

    return user
  } catch (e) {
    throw handleError('Error setting user: ', e)
  }
}

export const FBSetUserGeoLocation = async (
  uid: IUser['uid']
): Promise<IGeolocation> => {
  try {
    const location = await requestPermissionsAsync()

    if (location.status === StatusIUserLocation.allowed) {
      const geolocation = location.geolocation

      await updateDoc(doc(db, 'users', uid), {
        geolocation,
      })

      return geolocation
    }

    if (location.status === StatusIUserLocation.denied) {
      throw new Error(location.description)
    }

    throw new Error()
  } catch (e) {
    throw handleError('Error setting user geolocation: ', e)
  }
}

export const FBEditUserDetails = async (
  uid: IUser['uid'],
  userDetails: IUser['details']
): Promise<IUser['details']> => {
  try {
    await updateDoc(doc(db, 'users', uid), { details: userDetails })

    return userDetails
  } catch (e) {
    throw handleError('Error editing user: ', e)
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
    throw handleError('Error setting search filter settings: ', e)
  }
}

export const getUser = async (userId: IUser['uid']): Promise<IUser> => {
  try {
    const userSnap = await getDoc(doc(db, 'users', userId))
    return userSnap.data() as IUser
  } catch (e) {
    throw handleError('Error getting user: ', e)
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
    throw handleError('Error updating user events data refs: ', e)
  }
}
