import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuth, IUser, UserDetailType } from '../../types'
import { FBLogin, FBRegister, FBSetUserDetails } from '../../../firebase'
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
  async (userDetail: UserDetailType, thunkAPI) => {
    const { user } = thunkAPI.getState() as RootState
    await FBSetUserDetails(user.uid, userDetail)
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => action.payload,
    setUID: (state, action: PayloadAction<IUser['uid']>) => ({
      ...state,
      uid: action.payload,
    }),
    removeUID: state => ({ ...state, uid: '' }),
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, { payload }) => payload)
    builder.addCase(register.fulfilled, (state, { payload }) => payload)
  },
})

export const { actions: userActions, reducer: userReducer } = userSlice
