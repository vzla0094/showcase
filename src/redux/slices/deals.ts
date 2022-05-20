import { DealCategories } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IDealsState {
  activeDealCategories: Array<DealCategories>
}

const initialState: IDealsState = {
  activeDealCategories: [],
}

export const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setActiveDeals: (state, action: PayloadAction<DealCategories>) => {
      const { activeDealCategories } = state
      const index = activeDealCategories.indexOf(action.payload)

      if (index !== -1) {
        state.activeDealCategories = activeDealCategories.filter(
          dealCategory => dealCategory !== action.payload
        )
      } else {
        state.activeDealCategories = [...activeDealCategories, action.payload]
      }
    },
  },
})

export const { actions: dealsActions, reducer: dealsReducer } = dealsSlice
