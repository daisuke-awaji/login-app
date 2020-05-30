import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { useSelector } from 'react-redux'
import { Tooltip, IconButton, Avatar } from '@material-ui/core'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    },
  }),
)

export const UserProfileButton = () => {
  const classes = useStyles()
  const auth = useSelector((state: any) => state.authenticatedUser)
  const user = auth.user
  const history = useHistory()
  const handleClick = () => history.push(`/users/${user.id}`, { update: true })
  const title = `User Profile: ${user?.name}`
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" onClick={handleClick}>
        <Avatar
          alt={user?.name + 'ProfileImage'}
          src={user?.img}
          className={classes.img}
        />
      </IconButton>
    </Tooltip>
  )
}
