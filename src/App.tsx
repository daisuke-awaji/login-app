import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NotFound } from './components/router/NotFound'
import { Users } from './components/users/Users'
import { UserInfo } from './components/users/UserInfo'
import { LoginPage } from 'components/login/LoginPage'
import { PrivateRoute } from 'components/router/PrivateRoute'
import { HelloWorld } from './HelloWorld'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact sensitive path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute exact sensitive path="/users">
          <Users />
        </PrivateRoute>
        <PrivateRoute exact sensitive path="/users/:id">
          <UserInfo />
        </PrivateRoute>
        <PrivateRoute exact sensitive path="/">
          <HelloWorld />
        </PrivateRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
