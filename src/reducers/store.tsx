import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux'
import auth from './authenticate'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  authenticatedUser: auth,
})

/**
 * Logs all actions and states after they are dispatched.
 * もうこれでいいや
 */
const logger = (store: any) => (next: (arg0: any) => any) => (action: {
  type: any
}) => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd()
  return result
}

// TypeScript で Redux Dev Tools を使用する
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, logger)),
)

export default store
