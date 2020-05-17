import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { Users } from './users/Users'
import { UserInfo } from './users/UserInfo'
import { PrivateRoute } from './router/PrivateRoute'
import { HelloWorld as Home } from './Home'
import { Container } from '@material-ui/core'
import { RedirectToNotFound } from './router/RedirectToNotFound'

export const routes = [
  { path: '/users', name: 'users', Component: Users },
  { path: '/users/:id', name: 'user', Component: UserInfo },
  { path: '/', name: 'home', Component: Home },
]

export function Main() {
  return (
    <main>
      <Container maxWidth="xl">
        <Switch>
          {routes.map(({ path, Component }, key) => (
            <PrivateRoute exact key={key} path={path}>
              <Component />
            </PrivateRoute>
          ))}
          <Route>
            <RedirectToNotFound />
          </Route>
        </Switch>
      </Container>
    </main>
  )
}
