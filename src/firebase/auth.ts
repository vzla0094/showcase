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
        await dispatch(setUserGeoLocation())

        // company hydration
        dispatch(
          initializeCompany({
            companyId: user.company?.id || '',
          })
        )

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
