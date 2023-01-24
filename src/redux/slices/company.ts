import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

import {
  FBAddEvent,
  FBCreateCompany,
  FBEditEvent,
  FBGetEvent,
  FBInitializeCompany,
  FBSetCompany,
  FBCreateTicketType,
  FBEditTicketType,
  FBGetEventTickets,
  FBGetEventTicketTypes,
} from '../../firebase'

import {
  emptyEvent,
  IActiveEvent,
  IAddEventPayload,
  ICompany,
  IEditTicketTypePayload,
  IInitializeCompanyData,
  ISetActiveEventPayload,
  ITicketType,
  IUser,
} from '../../types'

export const companyInitialState: ICompany = {
  companyId: '',
  name: '',
  members: [],
  events: [],
  active: false,
  streetAddress: '',
  city: '',
  stateProvince: '',
  country: '',
  zipCode: '',
  telephoneNumber: '',
  cellphoneNumber: '',
  email: '',
  activeEvent: {
    ...emptyEvent,
    tickets: [],
    ticketTypes: [],
  },
}

const isCompanyActive = ({
  name,
  streetAddress,
  city,
  stateProvince,
  country,
  zipCode,
}: ICompany) =>
  Boolean(name && streetAddress && city && stateProvince && country && zipCode)

const setCompanyActive = createAsyncThunk(
  'company/setCompanyActive',
  async (company: ICompany) => {
    const { active, companyId } = company

    // if company.active didn't change don't call the api, just return
    const newActiveState = isCompanyActive(company)
    if (active === newActiveState) return active

    // toggle company active state in firebase
    await FBSetCompany(companyId, { active: newActiveState })

    return newActiveState
  }
)

export const initializeCompany = createAsyncThunk(
  'company/initializeCompany',
  async (data: IInitializeCompanyData) => await FBInitializeCompany(data)
)

export const createCompany = createAsyncThunk(
  'company/createCompany',
  async (uid: IUser['uid']) => await FBCreateCompany(uid)
)

export const setCompany = createAsyncThunk(
  'company/setCompany',
  async (payload: Partial<ICompany>, { getState, dispatch }) => {
    const state = getState() as RootState
    const { company } = state

    const data = await FBSetCompany(company.companyId, payload)

    dispatch(setCompanyActive({ ...company, ...data }))

    return data
  }
)

export const addEvent = createAsyncThunk(
  'company/addEvent',
  async ({ companyId, eventId }: IAddEventPayload) =>
    FBAddEvent(companyId, eventId)
)

export const createTicketType = createAsyncThunk(
  'company/createTicketType',
  async (ticketType: ITicketType, thunkAPI) => {
    const {
      company: { activeEvent },
    } = thunkAPI.getState() as RootState

    const newTicketType: ITicketType = {
      ...ticketType,
      eventId: activeEvent.id,
      eventCategory: activeEvent.category,
      available: ticketType.quantity,
    }

    const ticketTypeResponse = await FBCreateTicketType(newTicketType)

    // TODO: refactor event ticket limit calculation to iterate over all ticket types quantities
    // also, this should be done in the backend
    await FBEditEvent(activeEvent, {
      ...activeEvent,
      ticketLimit: activeEvent.ticketLimit + ticketType.quantity,
    })

    return ticketTypeResponse
  }
)

export const editTicketType = createAsyncThunk(
  'company/editTicketType',
  async (payload: IEditTicketTypePayload, thunkAPI) => {
    const {
      company: { activeEvent },
    } = thunkAPI.getState() as RootState

    let newTicketType: ITicketType = payload.newTicketType

    // If the ticket type quantity has changed, update the event ticket limit and the ticket type available tickets
    if (payload.prevTicketType.quantity !== payload.newTicketType.quantity) {
      const ticketQuantityDiff =
        payload.newTicketType.quantity - payload.prevTicketType.quantity

      newTicketType = {
        ...payload.newTicketType,
        available: payload.newTicketType.quantity - payload.prevTicketType.sold, // TODO: add validation to prevent quantity < sold
      }

      // TODO: refactor event ticket limit calculation to iterate over all ticket types quantities
      // also, this should be done in the backend
      await FBEditEvent(activeEvent, {
        ...activeEvent,
        ticketLimit: activeEvent.ticketLimit + ticketQuantityDiff,
      })
    }

    // If the ticket type quantity hasn't changed, just update the ticket type
    return await FBEditTicketType(newTicketType)
  }
)

export const setActiveEvent = createAsyncThunk(
  'company/setActiveEvent',
  async (payload: ISetActiveEventPayload) => {
    const { event, eventId, eventCategory } = payload
    if (event) return event

    const eventData = await FBGetEvent(eventId, eventCategory)
    const eventTicketTypes = await FBGetEventTicketTypes(eventId, eventCategory)
    const eventTickets = await FBGetEventTickets(eventId, eventCategory)

    return {
      ...eventData,
      ticketTypes: eventTicketTypes,
      tickets: eventTickets,
    } as IActiveEvent
  }
)

// TODO, add uuid for companyId for the first time
export const companySlice = createSlice({
  name: 'company',
  initialState: companyInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setCompany.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }))
    builder.addCase(
      initializeCompany.fulfilled,
      (state, { payload }) => payload
    )
    builder.addCase(setCompanyActive.fulfilled, (state, { payload }) => {
      state.active = payload
    })
    builder.addCase(createCompany.fulfilled, (state, { payload }) => payload)
    builder.addCase(addEvent.fulfilled, (state, { payload }) => {
      state.events.push(payload)
    })
    builder.addCase(createTicketType.fulfilled, (state, { payload }) => {
      state.activeEvent.ticketTypes.push(payload)
    })
    builder.addCase(editTicketType.fulfilled, (state, { payload }) => {
      const ticketTypeIndex = state.activeEvent.ticketTypes.findIndex(
        ticketType => ticketType.id === payload.id
      )

      state.activeEvent.ticketTypes[ticketTypeIndex] = payload
    })
    builder.addCase(setActiveEvent.fulfilled, (state, { payload }) => {
      state.activeEvent = payload
    })
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
