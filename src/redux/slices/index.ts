import { dealsActions, dealsReducer } from './deals'
import { userActions, userReducer } from './user'
import { companyActions, companyReducer } from './company'

export const reducers = {
  deals: dealsReducer,
  user: userReducer,
  company: companyReducer,
}

export const actions = {
  deals: dealsActions,
  user: userActions,
  company: companyActions,
}
