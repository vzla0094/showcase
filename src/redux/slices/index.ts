import { userActions, userReducer } from './user'
import { companyActions, companyReducer } from './company'
import { eventActions, eventReducer } from './activeEvent'

export const reducers = {
  user: userReducer,
  company: companyReducer,
  activeEvent: eventReducer,
}

export const actions = {
  user: userActions,
  company: companyActions,
  activeEvent: eventActions,
}
