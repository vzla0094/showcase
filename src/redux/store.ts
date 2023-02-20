import {
  combineReducers,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit'

import { userReducer } from './slices/user'
import { companyReducer } from './slices/company'
import { eventReducer } from './slices/activeEvent'

import { setupListeners } from '@reduxjs/toolkit/query'

// Create the root reducer separately, so we can extract the RootState type
const rootReducer = combineReducers({
  user: userReducer,
  company: companyReducer,
  activeEvent: eventReducer,
})

// setupStore function helps with testing https://redux.js.org/usage/writing-tests#guiding-principles
export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),
    preloadedState,
  })
}

export const store = setupStore()

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
