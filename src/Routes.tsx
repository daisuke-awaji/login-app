import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LoginPage } from 'components/login/LoginPage'
import Default from 'components/Default'
import { NotFound } from 'components/router/404'
export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact sensitive path="/login">
          <LoginPage />
        </Route>
        <Route path="/404" component={NotFound} />
        <Route path="/" component={Default} />
      </Switch>
    </BrowserRouter>
  )
}
