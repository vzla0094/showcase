import {
  ICompany,
  ICompanyAddressField,
  ICompanyContactField,
  ICompanyNameField,
  IInitializeCompanyData,
} from '../../types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
  FBInitializeCompany,
  FBSetCompanyAddress,
  FBSetCompanyContactInfo,
  FBSetCompanyName,
} from '../../../firebase'

export const companyInitialState: ICompany = {
  companyId: '',
  name: '',
  members: [],
  deals: [],
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

export const initializeCompany = createAsyncThunk(
  'company/initializeCompany',
  async (data: IInitializeCompanyData) => await FBInitializeCompany(data)
)

export const setCompanyName = createAsyncThunk(
  'company/setCompanyName',
  async (companyField: ICompanyNameField, thunkAPI) => {
    const { company } = thunkAPI.getState() as RootState
    return await FBSetCompanyName(company.companyId, companyField)
  }
)

export const setCompanyAddress = createAsyncThunk(
  'company/setCompanyAddress',
  async (companyAddressField: ICompanyAddressField, thunkAPI) => {
    const { company } = thunkAPI.getState() as RootState
    return await FBSetCompanyAddress(company.companyId, companyAddressField)
  }
)

export const setCompanyContactInfo = createAsyncThunk(
  'company/setCompanyContact',
  async (companyContactField: ICompanyContactField, thunkAPI) => {
    const { company } = thunkAPI.getState() as RootState
    return await FBSetCompanyContactInfo(company.companyId, companyContactField)
  }
)

// TODO, add uuid for companyId for the first time
export const companySlice = createSlice({
  name: 'company',
  initialState: companyInitialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(setCompanyName.fulfilled, (state, { payload }) => {
      state.name = payload.value
    })
    builder.addCase(setCompanyAddress.fulfilled, (state, { payload }) => {
      state.address = { ...state.address, [payload.fieldKey]: payload.value }
    })
    builder.addCase(setCompanyContactInfo.fulfilled, (state, { payload }) => {
      state.contactInfo = {
        ...state.contactInfo,
        [payload.fieldKey]: payload.value,
      }
    })
    builder.addCase(
      initializeCompany.fulfilled,
      (state, { payload }) => payload
    )
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
