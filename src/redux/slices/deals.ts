import { Deals } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IDealsState {
  activeDeals: Array<Deals>
}

const initialState: IDealsState = {
  activeDeals: [],
}

export const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setActiveDeals: (state, action: PayloadAction<Deals>) => {
      const { activeDeals } = state
      const index = activeDeals.indexOf(action.payload)

      if (index !== -1) {
        state.activeDeals = activeDeals.filter(deal => deal !== action.payload)
      } else {
        state.activeDeals = [...activeDeals, action.payload]
      }
    },
  },
})

export const { actions: dealsActions, reducer: dealsReducer } = dealsSlice
