import { sessionErrorsReducer } from './session'
import { combineReducers } from 'redux'

export default combineReducers({
    session: sessionErrorsReducer,

})