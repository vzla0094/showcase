import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IEditEventPayload, IEvent } from '../../types'
import { FBEditEvent } from '../../../firebase'

interface IInitialState {
  loading: boolean
  error: string
  events: Array<IEvent>
}

export const emptyEvent: IEvent = {
  id: '',
  company: '',
  name: '',
  state: 'draft',
  category: '',
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

export const editEvent = createAsyncThunk(
  'events/editEvent',
  async (payload: IEditEventPayload) => await FBEditEvent(payload)
)

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<IEvent>) => {
      state.events.push(action.payload)
    },
    editEvent: (state, action: PayloadAction<IEvent>) => {
      state.events.map(event => {
        if (event.id !== action.payload.id) return event
        return { ...event, ...action.payload }
      })
    },
  },
  extraReducers: builder => {
    builder.addCase(editEvent.fulfilled, (state, { payload }) => {
      state.events = state.events.map(event => {
        if (event.id !== payload.id) return event
        return { ...event, ...payload.data }
      })
    })
  },
})

export const { actions: eventsActions, reducer: eventsReducer } = eventsSlice
