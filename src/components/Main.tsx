import React from 'react'

import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './router/PrivateRoute'
import { Container } from '@material-ui/core'
import { RedirectToNotFound } from './router/RedirectToNotFound'
import Users from './users/Users'
import UserProfile from './profile/UserProfile'
import Home from './Home'

export const routes = [
  { path: '/users', name: 'users', Component: Users },
  { path: '/users/:id', name: 'user', Component: UserProfile },
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
