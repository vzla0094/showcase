import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { login, register } from '../../../firebase'
import { IAuth } from '../../types'
import { User as IFBUser } from 'firebase/auth'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: build => ({
    signinOrLogin: build.mutation<IFBUser['uid'], IAuth>({
      async queryFn(auth) {
        let data, error

        if (auth.authType === 'register') {
          ;[data, error] = await register(auth.email, auth.password)
        } else {
          ;[data, error] = await login(auth.email, auth.password)
        }

        if (error) return { error }

        return { data }
      },
    }),
  }),
})

export const { useSigninOrLoginMutation } = authApi
