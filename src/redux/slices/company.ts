import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

import {
  FBAddEvent,
  FBCreateCompany,
  FBInitializeCompany,
  FBRedeemTicket,
  FBSetCompany,
} from '../../firebase'

import {
  emptyCompany,
  IAddEventPayload,
  ICompany,
  ITicket,
  IUser,
} from '../../types'

export const companyInitialState = emptyCompany

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
  async (companyRef: IUser['companyRef']) =>
    await FBInitializeCompany(companyRef)
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

export const redeemTicket = createAsyncThunk(
  'company/redeemTicket',
  async (ticket: ITicket) => await FBRedeemTicket(ticket)
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
    builder.addCase(createCompany.fulfilled, (state, { payload }) => ({
      ...state,
      ...payload,
    }))
    builder.addCase(addEvent.fulfilled, (state, { payload }) => {
      state.events.push(payload)
    })
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
