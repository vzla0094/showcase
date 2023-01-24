import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  requestPermissionsAsync,
  FBLogin,
  FBRegister,
  FBSetUserDetail,
  FBSetUserGeoLocation,
  FBSetSearchFilterSettings,
} from '../../firebase'
import { RootState } from '../store'

import {
  emptyEvent,
  emptyUser,
  IAuth,
  IUser,
  IUserDetailsField,
  SearchFilterSettingsField,
  StatusIUserLocation,
} from '../../types'

export const userInitialState = emptyUser

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

export const setSearchFilterSetting = createAsyncThunk(
  'user/setSearchFilterSetting',
  async (searchFilterSettingField: SearchFilterSettingsField, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState
    return await FBSetSearchFilterSettings(user.uid, searchFilterSettingField)
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
    resetActiveEvent: state => {
      state.activeEvent = emptyEvent
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => payload)
    builder.addCase(register.fulfilled, (state, { payload }) => payload)
    builder.addCase(setUserDetail.fulfilled, (state, { payload }) => {
      state.details = { ...state.details, [payload.fieldKey]: payload.value }
    })
    builder.addCase(setSearchFilterSetting.fulfilled, (state, { payload }) => {
      state.searchFilterSettings = {
        ...state.searchFilterSettings,
        [payload.fieldKey]: payload.value,
      }
    })
    builder.addCase(setUserGeoLocation.fulfilled, (state, { payload }) => {
      state.geolocation = payload
    })
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
