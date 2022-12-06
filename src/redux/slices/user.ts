import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IAuth,
  IUser,
  IUserDetailsField,
  StatusIUserLocation,
} from '../../types'
import {
  FBLogin,
  FBRegister,
  FBSetUserGeoLocation,
  FBSetUserDetail,
  requestPermissionsAsync,
} from '../../../firebase'
import { RootState } from '../store'

export const userInitialState: IUser = {
  uid: '',
  details: {
    username: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    phoneNumber: '',
  },
  geolocation: {
    geoHash: '',
    accuracy: 0,
    latitude: 0,
    longitude: 0,
  },
  company: '',
}

export const login = createAsyncThunk(
  'user/login',
  async (auth: IAuth) => await FBLogin(auth.email, auth.password)
)

export const register = createAsyncThunk(
  'user/register',
  async (auth: IAuth) => await FBRegister(auth.email, auth.password)
)

export const setUserDetail = createAsyncThunk(
  'user/setUserDetail',
  async (userField: IUserDetailsField, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState
    return await FBSetUserDetail(user.uid, userField)
  }
)

export const setUserGeoLocation = createAsyncThunk(
  'user/setUserGeoLocation',
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState

    try {
      const location = await requestPermissionsAsync()

      if (location.status === StatusIUserLocation.allowed) {
        return await FBSetUserGeoLocation(location.geolocation, user.uid)
      }

      if (location.status === StatusIUserLocation.denied) {
        throw new Error(location.description)
      }
    } catch (e) {
      console.error('Error setting user geo location', e)

      return e
    }
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => action.payload,
    resetUser: () => userInitialState,
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => payload)
    builder.addCase(register.fulfilled, (state, { payload }) => payload)
    builder.addCase(setUserDetail.fulfilled, (state, { payload }) => {
      state.details = { ...state.details, [payload.fieldKey]: payload.value }
    })
    builder.addCase(setUserGeoLocation.fulfilled, (state, { payload }) => {
      state.geolocation = payload
    })
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
