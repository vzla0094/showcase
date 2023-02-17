import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import {
  FBCreateTicketType,
  FBEditTicketType,
  FBGetEvent,
  FBGetEventTickets,
  FBGetEventTicketTypes,
  FBRedeemTicket,
  FBUpdateEventTicketLimit,
} from '../../firebase'
import { RootState } from '../store'

import {
  emptyEvent,
  IActiveEventState,
  IEditTicketTypePayload,
  IEventSelector,
  ITicket,
  ITicketType,
} from '../../types'

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
    const eventId = event.id
    const eventCategory = event.category
    const dispatch = thunkApi.dispatch

    const newTicketType: ITicketType = {
      ...ticketType,
      eventId,
      eventCategory,
      available: ticketType.quantity,
    }

    const ticketTypeData = await FBCreateTicketType(newTicketType)

    // re-fetch activeEvent to reflect new ticket limit
    await dispatch(setActiveEvent({ eventId, eventCategory }))

    return ticketTypeData
  }
)

export const editTicketType = createAsyncThunk(
  'activeEvent/editTicketType',
  async (payload: IEditTicketTypePayload) => {
    let newTicketType: ITicketType = payload.newTicketType
    let newEventTicketLimit: number | undefined
    const ticketTypeQtyDelta =
      payload.newTicketType.quantity - payload.prevTicketType.quantity

    // If the ticket type quantity has changed, update the ticket type available tickets
    // TODO: update the event ticket limit also, handle in a firebase transaction

    if (ticketTypeQtyDelta) {
      newTicketType = {
        ...payload.newTicketType,
        available: payload.newTicketType.quantity - payload.prevTicketType.sold, // TODO: add validation to prevent quantity < sold
      }
      newEventTicketLimit = await FBUpdateEventTicketLimit(
        payload.prevTicketType.eventId,
        payload.prevTicketType.eventCategory,
        ticketTypeQtyDelta
      )
    }

    const ticketType = await FBEditTicketType(newTicketType)

    return {
      ticketType,
      newTicketLimit: newEventTicketLimit,
    }
  }
)

export const setActiveEvent = createAsyncThunk(
  'activeEvent/setActiveEvent',
  async (eventSelector: IEventSelector) => {
    const { eventId, eventCategory } = eventSelector

    return await FBGetEvent(eventId, eventCategory)
  }
)

export const setEventTickets = createAsyncThunk(
  'activeEvent/setEventTickets',
  async (eventSelector: IEventSelector) => {
    const { eventId, eventCategory } = eventSelector

    return await FBGetEventTickets(eventId, eventCategory)
  }
)

export const setEventTicketTypes = createAsyncThunk(
  'activeEvent/setEventTicketTypes',
  async (eventSelector: IEventSelector) => {
    const { eventId, eventCategory } = eventSelector

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
        ticketType => ticketType.id === payload.ticketType.id
      )
      state.ticketTypes[ticketTypeIndex] = payload.ticketType
      if (typeof payload.newTicketLimit === 'number')
        state.event.ticketLimit = Number(payload.newTicketLimit)
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
