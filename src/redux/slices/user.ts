import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  requestPermissionsAsync,
  FBLogin,
  FBRegister,
  FBSetUserDetail,
  FBSetUserGeoLocation,
  FBSetSearchFilterSettings,
  FBGetEvent,
  FBEditEvent,
} from '../../firebase'
import { RootState } from '../store'
import { generateUniqueId } from '../../helpers/generateUniqueId'

import {
  emptyEvent,
  emptyUser,
  IAuth,
  ISetActiveEventPayload,
  ITicketType,
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

export const setActiveEvent = createAsyncThunk(
  'user/setActiveEvent',
  async (payload: ISetActiveEventPayload) => {
    const { event, eventId, eventCategory } = payload
    if (event) return event

    return await FBGetEvent(eventId, eventCategory)
  }
)

export const createTicketType = createAsyncThunk(
  'user/createTicketType',
  async (ticketType: ITicketType, thunkAPI) => {
    const {
      user: { activeEvent },
    } = thunkAPI.getState() as RootState

    const ticketTypeId = await generateUniqueId()
    const ticketTypePayload: ITicketType = {
      ...ticketType,
      id: ticketTypeId,
      eventId: activeEvent.id,
      available: ticketType.quantity,
    }

    return await FBEditEvent(activeEvent, {
      ...activeEvent,
      ticketLimit: activeEvent.ticketLimit + ticketType.quantity,
      ticketTypes: [...activeEvent.ticketTypes, ticketTypePayload],
    })
  }
)

export const editTicketType = createAsyncThunk(
  'user/editTicketType',
  async (updatedTicketType: ITicketType, thunkAPI) => {
    const {
      user: { activeEvent },
    } = thunkAPI.getState() as RootState

    let eventTicketLimit = activeEvent.ticketLimit

    const ticketTypes = activeEvent.ticketTypes.map(ticketType => {
      if (ticketType.id !== updatedTicketType.id) return ticketType

      // If the ticket type quantity has changed, update the event ticket limit and ticket type available tickets
      if (updatedTicketType.quantity !== ticketType.quantity) {
        eventTicketLimit += updatedTicketType.quantity - ticketType.quantity
        return {
          ...updatedTicketType,
          available: updatedTicketType.quantity - ticketType.sold,
        }
      }

      return updatedTicketType
    })

    return await FBEditEvent(activeEvent, {
      ...activeEvent,
      ticketLimit: eventTicketLimit,
      ticketTypes,
    })
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
    builder.addCase(setActiveEvent.fulfilled, (state, { payload }) => {
      state.activeEvent = payload
    })
    builder.addCase(createTicketType.fulfilled, (state, { payload }) => {
      state.activeEvent = payload
    })
    builder.addCase(editTicketType.fulfilled, (state, { payload }) => {
      state.activeEvent = payload
    })
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
