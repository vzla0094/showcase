import AsyncStorage from '@react-native-async-storage/async-storage'

import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native'
import Constants from 'expo-constants'

const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
  measurementId: Constants.manifest?.extra?.firebaseMeasurementId,
}
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

// Initialize Firebase Authentication and get a reference to the service
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
})
