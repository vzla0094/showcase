import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import { setUserGeoLocation } from '../redux/slices/user'
import { getUser, setUser } from './user'
import { useEffect, useState } from 'react'
import { useAppDispatch } from '../hooks'
import { actions } from '../redux/slices'
import { initializeCompany } from '../redux/slices/company'
import { auth } from './config'

import { emptyUser, IUser } from '../types'
import { handleError } from '../helpers/errors'

export const FBRegister = async (
  email: string,
  password: string
): Promise<IUser> => {
  try {
    const { user: FBUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    return await setUser({
      ...emptyUser,
      uid: FBUser.uid,
    })
  } catch (e) {
    throw handleError('Error registering: ', e)
  }
}

export const FBLogin = async (
  email: string,
  password: string
): Promise<IUser> => {
  try {
    const { user: FBUser } = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )

    return await getUser(FBUser.uid)
  } catch (e) {
    throw handleError('Error logging in: ', e)
  }
}

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return onAuthStateChanged(auth, async fbUser => {
      if (fbUser) {
        // user hydration
        const user = await getUser(fbUser.uid)
        dispatch(actions.user.setUser(user))

        // user location
        // TODO: take this out of here. Calling this here causes the location to be set only once when user logs in.
        // This should be called on the RootNavigator component after calling useAuth.
        await dispatch(setUserGeoLocation())

        // company hydration
        dispatch(initializeCompany(user.companyRef))

        setAuthenticated(true)
        setLoading(false)
      } else {
        dispatch(actions.user.resetUser())
        setAuthenticated(false)
        setLoading(false)
      }
    })
  }, [])

  return { authenticated, loading }
}
