import { createStore } from 'redux'
import { combineReducers } from 'redux'
import authenticatedUser from './authenticate'

const reducer = combineReducers({
  authenticatedUser,
})
export default createStore(reducer)
