import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUsers } from 'apis/users'
import { IUser } from './IUser'

export const UserInfo = () => {
  // TODO: 本当はユーザ１件取得のAPIを呼ぶ
  const [users, setUsers] = useState<IUser[]>([])
  const fetchData = async () => {
    const users = await fetchUsers()
    setUsers(users)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const { id } = useParams()
  const one = users.find((user) => user.id === Number(id))
  return (
    <div>
      <h1>{one?.name}</h1>
      <h3>Email: {one?.email}</h3>
    </div>
  )
}
