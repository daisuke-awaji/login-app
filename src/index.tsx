import React from 'react'
import ReactDOM from 'react-dom'
import App from 'App'
import * as serviceWorker from 'serviceWorker'
import { Provider } from 'react-redux'
import store from 'reducers/store'
import { currentUser } from 'apis/auth'
import { loginSucceedAction } from 'reducers/authenticate'
import './index.css'

// TODO: cookieから取得する
const sessionId = localStorage.getItem('sessionId')

currentUser(sessionId)
  .then((user) => store.dispatch(loginSucceedAction(user)))
  .catch((error) => console.log(error))
  .then(() => {
    ReactDOM.render(
      <React.Fragment>
        <Provider store={store}>
          <App />
        </Provider>
      </React.Fragment>,
      document.getElementById('root'),
    )
  })

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
