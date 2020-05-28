import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function redirectToLogin(location: any): React.ReactNode {
  return <Redirect to={{ pathname: '/login', state: { from: location } }} />
}

export function PrivateRoute({ children, ...rest }: any) {
  const auth = useSelector((state: any) => state.authenticatedUser)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth?.user ? children : redirectToLogin(location)
      }
    />
  )
}
