import { DealCategoryNames } from '../../types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IDealsState {
  activeDealCategoryNames: Array<DealCategoryNames>
}

const initialState: IDealsState = {
  activeDealCategoryNames: [
    'Food',
    'Activities',
    'Events',
    'Stay',
    'Transportation',
  ],
}

export const dealsSlice = createSlice({
  name: 'deals',
  initialState,
  reducers: {
    setActiveDeals: (state, action: PayloadAction<DealCategoryNames>) => {
      const { activeDealCategoryNames } = state
      const index = activeDealCategoryNames.indexOf(action.payload)

      if (index !== -1) {
        state.activeDealCategoryNames = activeDealCategoryNames.filter(
          dealCategory => dealCategory !== action.payload
        )
      } else {
        state.activeDealCategoryNames = [
          ...activeDealCategoryNames,
          action.payload,
        ]
      }
    },
  },
})

export const { actions: dealsActions, reducer: dealsReducer } = dealsSlice
