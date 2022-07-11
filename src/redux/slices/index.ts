import { dealsActions, dealsReducer } from './deals'
import { userActions, userReducer } from './user'

export const reducers = {
  deals: dealsReducer,
  user: userReducer,
}

export const actions = {
  deals: dealsActions,
  user: userActions,
}
