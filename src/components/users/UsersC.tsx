import React from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from 'apis/users'
import { IUser } from './IUser'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

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
        <Typography variant="h3">Users</Typography>
        <TableContainer component={Paper}>
          <Table style={{ tableLayout: 'auto' }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell style={{ width: '10%' }} align="right">
                  Id
                </TableCell>
                <TableCell style={{ width: '30%' }} align="right">
                  Name
                </TableCell>
                <TableCell style={{ width: '40%' }} align="right">
                  Email
                </TableCell>
                <TableCell style={{ width: '10%' }} align="right">
                  Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map((user) => (
                <TableRow key={user.name}>
                  <TableCell style={{ width: '10%' }} align="right">
                    {user.id}
                  </TableCell>
                  <TableCell style={{ width: '30%' }} align="right">
                    <Link to={'/users/' + user.id}>{user.name}</Link>
                  </TableCell>
                  <TableCell
                    style={{
                      width: '40%',
                      maxWidth: '100px',
                      // textOverflow: 'ellipsis', // はみ出たテキストを切り取って ... を表示する
                      whiteSpace: 'nowrap',
                      overflow: 'scroll',
                    }}
                    align="right"
                  >
                    {user.email}
                  </TableCell>
                  <TableCell style={{ width: '10%' }} align="right">
                    {user.type}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )
  }
}
