import { createStore, applyMiddleware } from 'redux'
import { combineReducers } from 'redux'
import auth from './authenticate'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  authenticatedUser: auth,
})

// TypeScript で Redux Dev Tools を使用する
// const composeEnhancers =
// (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
  reducer /* preloadedState, */,
  applyMiddleware(thunk),
)
