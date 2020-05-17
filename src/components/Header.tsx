import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { useDispatch } from 'react-redux'
import { unSetUser } from 'reducers/authenticate'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { Tooltip } from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

export default function Header() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const handleClickLogout = () => dispatch(unSetUser())
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            App
          </Typography>
          {/* Tooltip has Warnings in strict mode*/}
          {/* https://github.com/mui-org/material-ui/issues/13394 */}
          <Tooltip title="User Profile">
            <IconButton color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton color="inherit" onClick={handleClickLogout}>
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  )
}
