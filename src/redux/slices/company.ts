import {
  ICompany,
  ICompanyAddressField,
  ICompanyContactField,
  ICompanyNameField,
} from '../../types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
  FBInitializeCompany,
  FBSetCompanyAddress,
  FBSetCompanyContactInfo,
  FBSetCompanyName,
} from '../../../firebase'
import { actions } from './index'

export const initialState: ICompany = {
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
  async (_, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState

    // uses companyId from user to determine whether to generate companyId
    const companyId = await FBInitializeCompany(
      user.companyInfo.companyId,
      user.uid
    )

    thunkAPI.dispatch(actions.user.setCompanyId(companyId))

    return companyId
  }
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
    builder.addCase(initializeCompany.fulfilled, (state, { payload }) => {
      state.companyId = payload
    })
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
