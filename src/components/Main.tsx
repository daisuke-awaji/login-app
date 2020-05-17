import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { NotFound } from './router/NotFound'
import { Users } from './users/Users'
import { UserInfo } from './users/UserInfo'
import { PrivateRoute } from './router/PrivateRoute'
import { HelloWorld } from '../HelloWorld'

export function Main() {
  return (
    <main>
      <Switch>
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
        </Route>{' '}
      </Switch>
    </main>
  )
}
