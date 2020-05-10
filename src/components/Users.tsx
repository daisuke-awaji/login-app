import React from 'react'
import { Link } from 'react-router-dom'

export function Users() {
  const users = [
    { id: 1, name: 'John', email: 'john@email.com' },
    { id: 2, name: 'Bob', email: 'bob@email.com' },
    { id: 3, name: 'Mark', email: 'mark@email.com' },
  ]
  const listUsers = users.map((user) => (
    <li key={user.id}>
      <Link to={'/users/' + user.id}>{user.name}</Link>
    </li>
  ))

  return (
    <div>
      <h1>Users</h1>
      <ul>{listUsers}</ul>
    </div>
  )
}
