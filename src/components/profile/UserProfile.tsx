import React, { useState, useEffect } from 'react'
import { Grid, Avatar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { useUser } from './useUser'
import { UserProfileTexts } from './UserProfileTexts'
import { EditUserProfileForm } from './EditUserProfileForm'
import { TextLoader } from './UserProfileTextLoader'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }),
)

const UserProfile = () => {
  const { id } = useParams()
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        UserProfile
      </Typography>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={8}>
          <UserProfileCard userId={id} />
        </Grid>
      </Grid>
    </div>
  )
}

const UserProfileCard = ({ userId }: { userId: string }) => {
  const classes = useStyles()
  const [user, error] = useUser(userId)
  const history = useHistory()
  useEffect(() => {
    if (error) history.push('/404')
  }, [error, history])

  const [editable, setEditable] = useState(false)
  const SwitchableUserProfile = () => {
    return editable ? (
      <EditUserProfileForm user={user} setEditable={setEditable} />
    ) : (
      <UserProfileTexts user={user} setEditable={setEditable} />
    )
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <Avatar
          alt={user?.name + 'ProfileImage'}
          src={user?.img}
          className={classes.img}
        />
      </Grid>
      <Grid item xs={12} container>
        <Grid item xs container direction="column" spacing={2}>
          {user ? <SwitchableUserProfile /> : <TextLoader />}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserProfile
