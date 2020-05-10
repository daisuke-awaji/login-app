import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { NotFound } from './components/NotFound'
import { Users } from './components/Users'
import { UserInfo } from './components/UserInfo'
import { LoginPage } from 'components/LoginPage'
import { PrivateRoute } from 'components/PrivateRoute'
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
