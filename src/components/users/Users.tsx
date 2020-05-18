import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchUsers } from 'apis/users'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { IUser } from './IUser'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles,
} from '@material-ui/core/styles'
import { TableFooter, TablePagination } from '@material-ui/core'
import { TablePaginationActions } from './TablePaginationActions'

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      color: theme.palette.primary.main,
      fontSize: 14,
      fontWeight: 'bold',
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell)

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
})

export const Users = () => {
  const classes = useStyles()
  const [users, setUsers] = useState<IUser[]>([])

  const fetchData = async () => {
    const users = await fetchUsers()
    setUsers(users)
  }
  useEffect(() => {
    fetchData()
  }, [])

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const emptyRowsInLastPage =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage)

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const usersInPage =
    rowsPerPage > 0
      ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      : users
  return (
    <>
      <Typography variant="h2">Users</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="user table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: '10%' }} align="right">
                Id
              </StyledTableCell>
              <StyledTableCell style={{ width: '30%' }} align="right">
                Name
              </StyledTableCell>
              <StyledTableCell style={{ width: '40%' }} align="right">
                Email
              </StyledTableCell>
              <StyledTableCell style={{ width: '10%' }} align="right">
                Type
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersInPage.map((user, key) => (
              <TableRow key={key}>
                <StyledTableCell style={{ width: '10%' }} align="right">
                  {user.id}
                </StyledTableCell>
                <StyledTableCell style={{ width: '30%' }} align="right">
                  <Link to={'/users/' + user.id}>{user.name}</Link>
                </StyledTableCell>
                <StyledTableCell
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
                </StyledTableCell>
                <StyledTableCell style={{ width: '10%' }} align="right">
                  {user.type}
                </StyledTableCell>
              </TableRow>
            ))}
            {/* 最終ページだけ余白を用意する */}
            {emptyRowsInLastPage > 0 && (
              <TableRow style={{ height: 53 * emptyRowsInLastPage }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  )
}
