import {
  ICompany,
  ICompanyAddressField,
  ICompanyContactField,
  ICompanyNameField,
} from '../../types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
  FBSetCompanyAddress,
  FBSetCompanyContactInfo,
  FBSetCompanyName,
} from '../../../firebase'

const initialState: ICompany = {
  companyId: '',
  name: '',
  members: [],
  deals: [],
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

export const setCompanyName = createAsyncThunk(
  'company/setCompanyName',
  async (companyField: ICompanyNameField, thunkAPI) => {
    const { company } = thunkAPI.getState() as RootState
    return await FBSetCompanyName(company.companyId, companyField)
  }
)

export const setCompanyAddress = createAsyncThunk(
  'company/setCompanyAddress',
  async (companyAddress: ICompanyAddressField, thunkAPI) => {
    const { company } = thunkAPI.getState() as RootState
    return await FBSetCompanyAddress(company.companyId, companyAddress)
  }
)

export const setCompanyContactInfo = createAsyncThunk(
  'company/setCompanyContact',
  async (companyContactInfo: ICompanyContactField, thunkAPI) => {
    const { company } = thunkAPI.getState() as RootState
    return await FBSetCompanyContactInfo(company.companyId, companyContactInfo)
  }
)

// TODO, add uuid for companyId for the first time
export const companySlice = createSlice({
  name: 'company',
  initialState,
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
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
