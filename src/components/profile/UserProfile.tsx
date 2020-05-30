import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, Avatar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { IUser } from 'components/users/IUser'
import { useForm, Controller } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import { List } from 'react-content-loader'
import { useUser } from './useUser'
import { thunkedUpdateUserAction } from 'reducers/users'
const TextLoader = () => <List />

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }),
)

const UserProfileCard = ({ userId }: { userId: string }) => {
  const classes = useStyles()
  const [user, error] = useUser(userId)
  const history = useHistory()
  useEffect(() => {
    if (error) {
      history.push('/404')
    }
  }, [error, history])

  const auth = useSelector((state: any) => state.authenticatedUser)
  const isMe = auth.user.id === user?.id
  const [editable, setEditable] = useState(false)
  const EditButton = () => {
    return (
      <Button onClick={() => setEditable(!editable)} color="primary">
        Edit
      </Button>
    )
  }

  const UserProfileTexts = () => {
    const Name = () => (
      <Typography gutterBottom variant="subtitle1">
        {user?.name}
      </Typography>
    )
    const Email = () => (
      <Typography gutterBottom variant="subtitle2">
        {user?.email}
      </Typography>
    )
    const Description = () => (
      <Typography variant="body2" gutterBottom>
        {user?.description}
      </Typography>
    )
    const Type = () => (
      <Typography variant="body2" color="textSecondary">
        {user?.type}
      </Typography>
    )
    const ID = () => (
      <Typography variant="body2" color="textSecondary">
        ID: {user?.id}
      </Typography>
    )
    return (
      <>
        <Name />
        <Email />
        <Description />
        <ID />
        <Type />
        {isMe ? (
          <Grid item container alignItems="flex-end" justify="flex-end">
            {editable ? undefined : <EditButton />}
          </Grid>
        ) : undefined}
      </>
    )
  }

  const EditableForms = () => {
    const { handleSubmit, control, register } = useForm<IUser>({
      mode: 'onBlur',
      reValidateMode: 'onChange',
    })
    const dispatch = useDispatch()

    const saveUser = (user: IUser) => {
      dispatch(thunkedUpdateUserAction(user))
      setEditable(!editable)
    }

    const SaveButton = () => {
      return (
        <Button onClick={handleSubmit(saveUser)} color="secondary">
          Save
        </Button>
      )
    }
    const CancelButton = () => {
      return (
        <Button onClick={() => setEditable(!editable)} color="default">
          Cancel
        </Button>
      )
    }
    return (
      <form>
        <input ref={register} type="hidden" name="id" value={user?.id} />
        <Controller
          as={
            <TextField
              id="nameInputForm"
              label="name"
              fullWidth
              variant="outlined"
              style={{ padding: '10px' }}
              size="small"
            />
          }
          name="name"
          control={control}
          defaultValue={user?.name}
        />
        <Controller
          as={
            <TextField
              id="emailInputForm"
              label="email"
              fullWidth
              variant="outlined"
              style={{ padding: '10px' }}
              size="small"
            />
          }
          name="email"
          control={control}
          defaultValue={user?.email}
        />
        <Controller
          as={
            <TextField
              id="descriptionInputForm"
              label="description"
              multiline
              fullWidth
              rows={3}
              variant="outlined"
              style={{ padding: '10px' }}
              size="small"
            />
          }
          name="description"
          control={control}
          defaultValue={user?.description}
        />
        {editable ? (
          <Grid item container alignItems="flex-end" justify="flex-end">
            <CancelButton />
            <SaveButton />
          </Grid>
        ) : undefined}
        <input ref={register} type="hidden" name="type" value={user?.type} />
        <input ref={register} type="hidden" name="img" value={user?.img} />
      </form>
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
          {user ? (
            editable ? (
              <EditableForms />
            ) : (
              <UserProfileTexts />
            )
          ) : (
            <TextLoader />
          )}
        </Grid>
      </Grid>
    </Grid>
  )
}

function UserProfile() {
  let { id } = useParams()
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

export default UserProfile
