import React from 'react'
import { Link } from 'react-router-dom'
export const HelloWorld = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <ul>
        <li>
          <Link to="/users">Users</Link>
        </li>
      </ul>
    </div>
  )
}
