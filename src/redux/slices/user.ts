import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuth, IUser } from '../../types'
import { FBLogin, FBRegister } from '../../../firebase'

const initialState: IUser = {
  uid: '',
  details: {
    username: '',
    birthDay: '',
    birthMonth: '',
    birthYear: '',
    phoneNumber: '',
  },
  companyInfo: {
    companyId: '',
    companyName: '',
    deals: [],
  },
}

export const login = createAsyncThunk(
  'user/login',
  async (auth: IAuth) => await FBLogin(auth.email, auth.password)
)

export const register = createAsyncThunk(
  'user/register',
  async (auth: IAuth) => await FBRegister(auth.email, auth.password)
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => action.payload,
    setUserDetails: (state, action: PayloadAction<IUser['details']>) => {
      state.details = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => payload)
    builder.addCase(register.fulfilled, (state, { payload }) => payload)
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
