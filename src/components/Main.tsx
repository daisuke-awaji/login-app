import React, { Suspense, lazy } from 'react'

import { Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './router/PrivateRoute'
import { Container } from '@material-ui/core'
import { RedirectToNotFound } from './router/RedirectToNotFound'

const Home = lazy(() => import('./Home'))
const Users = lazy(() => import('./users/Users'))
const UserProfile = lazy(() => import('./profile/UserProfile'))

export const routes = [
  { path: '/users', name: 'users', Component: Users },
  { path: '/users/:id', name: 'user', Component: UserProfile },
  { path: '/', name: 'home', Component: Home },
]
function Loading() {
  return <p>Loading...</p>
}

export function Main() {
  return (
    <main>
      <Container maxWidth="xl">
        <Suspense fallback={Loading}>
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
        </Suspense>
      </Container>
    </main>
  )
}
