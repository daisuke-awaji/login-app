import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import { Tooltip } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { ServiceLogo } from '../ServiceLogo'
import LogoutButton from '../logout/LogoutButton'
import { UserProfileButton } from './UserProfileButton'

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

/**
 * Tooltip has Warnings in strict mode
 * https://github.com/mui-org/material-ui/issues/13394
 */
const HomeButton = () => {
  const history = useHistory()
  const handleClickHome = () => history.push('/')
  return (
    <Tooltip title="Home">
      <IconButton color="inherit" onClick={handleClickHome}>
        <HomeIcon />
      </IconButton>
    </Tooltip>
  )
}

const AppIconButton = (props: any) => {
  const { className } = props
  const history = useHistory()
  const handleClickHome = () => history.push('/')
  return (
    <IconButton
      edge="start"
      className={className}
      color="inherit"
      aria-label="home"
      onClick={handleClickHome}
    >
      <ServiceLogo />
    </IconButton>
  )
}

export default function Header() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        color="primary"
        style={{ background: 'transparent', boxShadow: 'none' }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <AppIconButton className={classes.menuButton} />
          </Typography>
          <HomeButton />
          <LogoutButton />
          <UserProfileButton />
        </Toolbar>
      </AppBar>
    </div>
  )
}
