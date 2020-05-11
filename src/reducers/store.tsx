import { createStore } from 'redux'
import { combineReducers, compose } from 'redux'
import authenticatedUser from './authenticate'

const reducer = combineReducers({
  authenticatedUser,
})

// TypeScript で Redux Dev Tools を使用する
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(reducer /* preloadedState, */, composeEnhancers())
