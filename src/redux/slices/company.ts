import {
  CompanyAddressType,
  CompanyContactInfoType,
  CompanyDetailType,
  ICompany,
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
  async (name: CompanyDetailType['name'], thunkAPI) => {
    const { company } = thunkAPI.getState() as RootState
    return await FBSetCompanyName(company.companyId, name)
  }
)

export const setCompanyAddress = createAsyncThunk(
  'company/setCompanyAddress',
  async (companyAddress: Partial<CompanyAddressType>, thunkAPI) => {
    const { company } = thunkAPI.getState() as RootState
    return await FBSetCompanyAddress(company.companyId, companyAddress)
  }
)

export const setCompanyContactInfo = createAsyncThunk(
  'company/setCompanyContact',
  async (companyContactInfo: Partial<CompanyContactInfoType>, thunkAPI) => {
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
    builder.addCase(setCompanyAddress.fulfilled, (state, { payload }) => {
      state.address = { ...state.address, ...payload }
    })
    builder.addCase(setCompanyName.fulfilled, (state, { payload }) => {
      state.name = payload.name
    })
    builder.addCase(setCompanyContactInfo.fulfilled, (state, { payload }) => {
      state.contactInfo = { ...state.contactInfo, ...payload }
    })
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
