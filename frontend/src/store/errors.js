import { sessionErrorReducer } from './session'
import { combineReducers } from 'redux'

export default combineReducers({
    session: sessionErrorReducer
})