import { createStore } from 'redux'
import { combineReducers } from 'redux'
import authenticateReducer from './authenticate'

const reducer = combineReducers({
  isAuthenticated: authenticateReducer,
})
export default createStore(reducer)
