import { createStore, combineReducers, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import { Dishes } from './dishes'
import { Comments } from './comments'
import { Promotions } from './promotions'
import { Leaders } from './leaders'
import thunk from 'redux-thunk'
import { createForms } from 'react-redux-form'
import { InitialFeedback } from './form'
import logger from 'redux-logger'

const store = createStore(
  combineReducers({
    dishes: Dishes,
    comments: Comments,
    promotions: Promotions,
    leaders: Leaders,
    ...createForms({
      feedback: InitialFeedback,
    }),
  }),
  applyMiddleware(thunk, logger)
)

export default store
