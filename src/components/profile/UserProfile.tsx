import React, { useState } from 'react'
import { Grid, TextField, Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import ButtonBase from '@material-ui/core/ButtonBase'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      margin: 'auto',
      maxWidth: 500,
    },
    image: {
      width: 128,
      height: 128,
    },
    img: {
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
)

const UserProfileCard = () => {
  const classes = useStyles()
  const user = useSelector((state: any) => state.authenticatedUser)
  const [editable, setEditable] = useState(false)

  const handleClick = () => setEditable(!editable)

  const UserProfileEditColumn = () => {
    const txt = `${user?.name} Lorem ipsum dolor sit, amet consectetur adipisicing elit📷✈️🏕️`
    if (editable) {
      return (
        <TextField
          id="outlined-multiline-static"
          label="User Profile"
          multiline
          fullWidth
          rows={3}
          defaultValue={txt}
          variant="outlined"
        />
      )
    } else {
      return (
        <Typography variant="body2" gutterBottom>
          {txt}
        </Typography>
      )
    }
  }

  const EditButton = () => {
    return (
      <Button onClick={handleClick} color={editable ? 'secondary' : 'primary'}>
        {editable ? 'Save' : 'Edit'}
      </Button>
    )
  }

  return (
    <Grid container spacing={2} justify="center">
      <Grid item>
        <ButtonBase className={classes.image}>
          <img
            className={classes.img}
            alt="userProfileImg"
            src="https://res.cloudinary.com/muhammederdem/image/upload/v1537638518/Ba%C5%9Fl%C4%B1ks%C4%B1z-1.jpg"
          />
        </ButtonBase>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {user?.name}
            </Typography>
            <UserProfileEditColumn />
            <Typography variant="body2" color="textSecondary">
              ID: {user?.id}
            </Typography>
          </Grid>
          <Grid item container alignItems="flex-end" justify="flex-end">
            <EditButton />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export function UserProfile() {
  return (
    <div>
      <Typography variant="h2" gutterBottom>
        UserProfile
      </Typography>
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={8}>
          <UserProfileCard />
        </Grid>
      </Grid>
    </div>
  )
}
