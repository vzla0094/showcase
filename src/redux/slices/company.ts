import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

import {
  FBCreateCompany,
  FBInitializeCompany,
  FBSetCompanyDetails,
} from '../../../firebase'

import {
  ICompany,
  IInitializeCompanyData,
  ICompanyDetailsPayload,
  IUser,
} from '../../types'

export const companyInitialState: ICompany = {
  companyId: '',
  name: '',
  members: [],
  events: [],
  active: false,
  address: {
    streetAddress: '',
    city: '',
    stateProvince: '',
    country: '',
    zipCode: '',
    latitude: '',
    longitude: '',
  },
  contactInfo: {
    telephoneNumber: '',
    cellphoneNumber: '',
    email: '',
  },
}

const isCompanyActive = ({
  name,
  address: { streetAddress, city, stateProvince, country, zipCode },
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
    await FBSetCompanyDetails(companyId, {
      companyDetailsField: { fieldKey: 'active', value: newActiveState },
    })

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

export const setCompanyDetails = createAsyncThunk(
  'company/setCompanyDetails',
  async (
    companyDetailsPayload: ICompanyDetailsPayload,
    { getState, dispatch }
  ) => {
    const { detailSection } = companyDetailsPayload
    const state = getState() as RootState
    const { company } = state
    let newCompanyState: ICompany

    const { fieldKey, value } = await FBSetCompanyDetails(
      company.companyId,
      companyDetailsPayload
    )

    if (detailSection) {
      newCompanyState = {
        ...company,
        [detailSection]: { ...company[detailSection], [fieldKey]: value },
      }
    } else {
      newCompanyState = { ...company, [fieldKey]: value }
    }

    dispatch(setCompanyActive(newCompanyState))

    return newCompanyState
  }
)

// TODO, add uuid for companyId for the first time
export const companySlice = createSlice({
  name: 'company',
  initialState: companyInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(
      setCompanyDetails.fulfilled,
      (state, { payload }) => payload
    )
    builder.addCase(
      initializeCompany.fulfilled,
      (state, { payload }) => payload
    )
    builder.addCase(setCompanyActive.fulfilled, (state, { payload }) => {
      state.active = payload
    })
    builder.addCase(createCompany.fulfilled, (state, { payload }) => payload)
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
