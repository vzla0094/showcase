import { userActions, userReducer } from './user'
import { companyActions, companyReducer } from './company'

export const reducers = {
  user: userReducer,
  company: companyReducer,
}

export const actions = {
  user: userActions,
  company: companyActions,
}
