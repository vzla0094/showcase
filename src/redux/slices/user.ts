import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  FBLogin,
  FBRegister,
  FBSetSearchFilterSettings,
  FBSetUserDetail,
  FBSetUserGeoLocation,
  FBUpdateUserEventsDataRefs,
} from '../../firebase'
import { RootState } from '../store'

import {
  emptyUser,
  IAuth,
  IUser,
  IUserDetailsField,
  IUserEventDataRef,
  SearchFilterSettingsField,
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

    return await FBSetUserGeoLocation(user.uid)
  }
)

export const updateUserEventsDataRefs = createAsyncThunk(
  'user/updateUserEventDataRefs',
  async (userEventDataRef: IUserEventDataRef, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState

    return await FBUpdateUserEventsDataRefs(user.uid, userEventDataRef)
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IUser>) => payload,
    resetUser: () => userInitialState,
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => payload)
    builder.addCase(register.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }))
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
    builder.addCase(
      updateUserEventsDataRefs.fulfilled,
      (state, { payload }) => {
        state.eventsDataRefs = payload
      }
    )
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
