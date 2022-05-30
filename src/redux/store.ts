import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './slices'
import { dealsApi } from './services/deals'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './services/auth'

export const store = configureStore({
  reducer: {
    deals: reducers.deals,
    [dealsApi.reducerPath]: dealsApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(dealsApi.middleware)
      .concat(authApi.middleware),
})

setupListeners(store.dispatch)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
