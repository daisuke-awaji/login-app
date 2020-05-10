import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { unSetUser } from 'reducers/authenticate'
import { Button } from '@material-ui/core'
export const HelloWorld = () => {
  const dispatch = useDispatch()
  const handleClick = () => {
    dispatch(unSetUser())
  }

  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
      <Button color="primary" onClick={handleClick}>
        <span>ログアウト</span>
      </Button>
    </div>
  )
}
