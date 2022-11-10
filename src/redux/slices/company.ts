import { ICompany } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<ICompany>) => ({
      ...state,
      ...action.payload,
      address: { ...state.address, ...action.payload.address },
      contactInfo: { ...state.contactInfo, ...action.payload.contactInfo },
    }), // TODO, add uuid for companyId for the first time
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
