import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { IEditEventPayload, IEvent } from '../../types'
import { FBCreateEvent, FBEditEvent } from '../../../firebase'
import { RootState } from '../store'

interface IInitialState {
  loading: boolean
  error: string
  events: Array<IEvent>
}

export const emptyEvent: IEvent = {
  id: '',
  company: '',
  name: '',
  description: '',
  startDateTime: '',
  endDateTime: '',
  ticketCount: 0,
  ticketLimit: 0,
  tickets: [],
  timeSlots: [],
}

const initialState: IInitialState = {
  error: '',
  loading: false,
  events: [],
}

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (_, { getState }) => {
    const state = getState() as RootState
    const { company } = state

    return await FBCreateEvent(company.companyId)
  }
)

export const editEvent = createAsyncThunk(
  'event/editEvent',
  async (payload: IEditEventPayload) => await FBEditEvent(payload)
)

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createEvent.fulfilled, (state, { payload }) => {
        state.loading = false
        state.events = [...state.events, payload]
      })
      .addCase(createEvent.pending, state => {
        state.loading = true
      })

    builder.addCase(editEvent.fulfilled, (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event.id !== payload.id) return event
        return { ...event, ...payload.data }
      })
    })
  },
})

export const { actions: eventsActions, reducer: eventsReducer } = eventsSlice
