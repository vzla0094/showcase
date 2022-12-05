import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EVENT_CATEGORIES, IEvent } from '../../types'

interface IInitialState {
  loading: boolean
  error: string
  allEvents: Array<IEvent>
  categories: {
    [key in EVENT_CATEGORIES]: Array<IEvent>
  }
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
  allEvents: [],
  categories: {
    food: [],
    activities: [],
    events: [],
    accommodation: [],
    transportation: [],
  },
}

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, { payload }: PayloadAction<IEvent>) => {
      state.allEvents.push(payload)
    },
    editEvent: (state, { payload }: PayloadAction<IEvent>) => {
      state.allEvents = state.allEvents.map(event =>
        event.id === payload.id ? { ...event, ...payload } : event
      )
    },
    removeEvent: (state, { payload }: PayloadAction<IEvent>) => {
      state.allEvents = state.allEvents.filter(event => event.id !== payload.id)
    },
    addEventCategory: (state, { payload }: PayloadAction<IEvent>) => {
      if (payload.category) {
        state.categories[payload.category].push(payload)
      }
    },
    editEventCategory: (state, { payload }: PayloadAction<IEvent>) => {
      if (payload.category) {
        state.categories[payload.category] = state.categories[
          payload.category
        ].map(event =>
          event.id === payload.id ? { ...event, ...payload } : event
        )
      }
    },
    removeEventCategory: (state, { payload }: PayloadAction<IEvent>) => {
      if (payload.category) {
        state.categories[payload.category] = state.categories[
          payload.category
        ].filter(event => event.id !== payload.id)
      }
    },
  },
})

export const { actions: eventsActions, reducer: eventsReducer } = eventsSlice
