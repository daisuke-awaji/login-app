import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import { logoutAction } from 'reducers/authenticate'
import { useDispatch } from 'react-redux'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Tooltip } from '@material-ui/core'

export default function LogoutButton() {
  const dispatch = useDispatch()
  const handleClickLogout = () => dispatch(logoutAction())
  return (
    <Tooltip title="Logout">
      <IconButton color="inherit" onClick={handleClickLogout}>
        <ExitToAppIcon />
      </IconButton>
    </Tooltip>
  )
}
