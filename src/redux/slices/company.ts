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
  },
}

export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action: PayloadAction<ICompany>) => action.payload,
  },
})

export const { actions: companyActions, reducer: companyReducer } = companySlice
