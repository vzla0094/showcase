import { dealsActions, dealsReducer } from './deals'
import { userActions, userReducer } from './user'
import { companyActions, companyReducer } from './company'
import { eventsActions, eventsReducer } from './events'

export const reducers = {
  deals: dealsReducer,
  user: userReducer,
  company: companyReducer,
  events: eventsReducer,
}

export const actions = {
  deals: dealsActions,
  user: userActions,
  company: companyActions,
  events: eventsActions,
}
