import { sessionErrorReducer } from './session'
import { combineReducers } from 'redux'
import { reviewErrorReducer } from './review'

export default combineReducers({
    session: sessionErrorReducer,
    review: reviewErrorReducer
})