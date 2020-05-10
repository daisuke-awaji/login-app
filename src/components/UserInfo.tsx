import React from 'react'
import { useParams } from 'react-router-dom'
export const UserInfo = () => {
  const users = [
    { id: 1, name: 'John', email: 'john@email.com' },
    { id: 2, name: 'Bob', email: 'bob@email.com' },
    { id: 3, name: 'Mark', email: 'mark@email.com' },
  ]
  const { id } = useParams()
  const one = users.find((user) => user.id === Number(id))
  return (
    <div>
      <h1>Hello {one?.name}</h1>
      <h3>Email: {one?.email}</h3>
    </div>
  )
}
