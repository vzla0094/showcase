import {
  emptyEvent,
  IEditTicketTypePayload,
  IActiveEventState,
  ISetActiveEventPayload,
  ITicket,
  ITicketType,
} from '../../types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  FBCreateTicketType,
  FBEditTicketType,
  FBGetEvent,
  FBGetEventTickets,
  FBGetEventTicketTypes,
  FBRedeemTicket,
} from '../../firebase'
import { RootState } from '../store'

export const activeEventInitialState: IActiveEventState = {
  event: emptyEvent,
  tickets: [],
  ticketTypes: [],
}

export const createTicketType = createAsyncThunk(
  'activeEvent/createTicketType',
  async (ticketType: ITicketType, thunkApi) => {
    const {
      activeEvent: { event },
    } = thunkApi.getState() as RootState

    const newTicketType: ITicketType = {
      ...ticketType,
      eventId: event.id,
      eventCategory: event.category,
      available: ticketType.quantity,
    }

    // TODO: modify FBCreateTicketType to do a transaction for the event ticket limit
    return await FBCreateTicketType(newTicketType)
  }
)

export const editTicketType = createAsyncThunk(
  'activeEvent/editTicketType',
  async (payload: IEditTicketTypePayload) => {
    let newTicketType: ITicketType = payload.newTicketType

    // If the ticket type quantity has changed, update the event ticket limit and the ticket type available tickets
    // TODO: handle in a firebase transaction
    if (payload.prevTicketType.quantity !== payload.newTicketType.quantity) {
      newTicketType = {
        ...payload.newTicketType,
        available: payload.newTicketType.quantity - payload.prevTicketType.sold, // TODO: add validation to prevent quantity < sold
      }
    }

    return await FBEditTicketType(newTicketType)
  }
)

export const setActiveEvent = createAsyncThunk(
  'activeEvent/setActiveEvent',
  async (payload: ISetActiveEventPayload) => {
    const { eventId, eventCategory } = payload

    return await FBGetEvent(eventId, eventCategory)
  }
)

export const setEventTickets = createAsyncThunk(
  'activeEvent/setEventTickets',
  async (payload: ISetActiveEventPayload) => {
    const { eventId, eventCategory } = payload

    return await FBGetEventTickets(eventId, eventCategory)
  }
)

export const setEventTicketTypes = createAsyncThunk(
  'activeEvent/setEventTicketTypes',
  async (payload: ISetActiveEventPayload) => {
    const { eventId, eventCategory } = payload

    return await FBGetEventTicketTypes(eventId, eventCategory)
  }
)

export const redeemTicket = createAsyncThunk(
  'activeEvent/redeemTicket',
  async (ticket: ITicket) => await FBRedeemTicket(ticket)
)

export const activeEventSlice = createSlice({
  name: 'activeEvent',
  initialState: activeEventInitialState,
  reducers: {
    resetActiveEvent: () => activeEventInitialState,
  },
  extraReducers: builder => {
    builder.addCase(createTicketType.fulfilled, (state, { payload }) => {
      state.ticketTypes.push(payload)
    })
    builder.addCase(editTicketType.fulfilled, (state, { payload }) => {
      const ticketTypeIndex = state.ticketTypes.findIndex(
        ticketType => ticketType.id === payload.id
      )
      state.ticketTypes[ticketTypeIndex] = payload
    })
    builder.addCase(setActiveEvent.fulfilled, (state, { payload }) => {
      state.event = payload
    })
    builder.addCase(setEventTickets.fulfilled, (state, { payload }) => {
      state.tickets = payload
    })
    builder.addCase(setEventTicketTypes.fulfilled, (state, { payload }) => {
      state.ticketTypes = payload
    })
    builder.addCase(redeemTicket.fulfilled, (state, { payload }) => {
      const ticketIndex = state.tickets.findIndex(
        ticket => ticket.id === payload.id
      )
      state.tickets[ticketIndex] = payload
    })
  },
})

export const { actions: eventActions, reducer: eventReducer } = activeEventSlice
