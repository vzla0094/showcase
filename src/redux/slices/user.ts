import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuth, IUser, IUserField } from '../../types'
import { FBLogin, FBRegister, FBSetUserDetail } from '../../../firebase'
import { RootState } from '../store'

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

export const setUserDetail = createAsyncThunk(
  'user/setUserDetail',
  async (userField: IUserField, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState
    return await FBSetUserDetail(user.uid, userField)
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => action.payload,
    resetUser: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => payload)
    builder.addCase(register.fulfilled, (state, { payload }) => payload)
    builder.addCase(setUserDetail.fulfilled, (state, { payload }) => {
      state.details = { ...state.details, [payload.fieldKey]: payload.value }
    })
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
