import { userActions, userReducer } from './user'
import { companyActions, companyReducer } from './company'
import { eventsActions, eventsReducer } from './events'

export const reducers = {
  user: userReducer,
  company: companyReducer,
  events: eventsReducer,
}

export const actions = {
  user: userActions,
  company: companyActions,
  events: eventsActions,
}
