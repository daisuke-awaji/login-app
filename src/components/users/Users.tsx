import React from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from 'apis/users'
import { IUser } from './IUser'

interface IProps {
  classes?: any
}
interface IState {
  users: IUser[]
}

export class Users extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props)
    this.state = { users: [] }
  }
  async componentDidMount() {
    const users = await fetchUsers()
    this.setState({ users: users })
  }
  render() {
    return (
      <>
        <h1>Users</h1>
        <ul>
          {this.state.users?.map((user: IUser) => (
            <li key={user.id}>
              <Link to={'/users/' + user.id}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  }
}
