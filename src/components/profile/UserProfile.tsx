import React, { useState, useEffect } from 'react'
import { Grid, TextField, Button, Avatar } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { useParams, useHistory } from 'react-router-dom'
import { fetchUser } from 'apis/users'
import { IUser } from 'components/users/IUser'
import { useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  }),
)

const UserProfileCard = ({ userId }: { userId: number }) => {
  const classes = useStyles()
  const history = useHistory()
  const [user, setUser] = useState<IUser>()
  const fetchData = async () => {
    try {
      const result = await fetchUser(userId)
      setUser(result)
    } catch (e) {
      console.log(e)
      history.push(`/404`)
    }
  }
  useEffect(() => {
    fetchData()
  })

  const { handleSubmit, control } = useForm<IUser>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const saveUser = (user: IUser) => {
    console.log(user)
    setUser({
      id: 1,
      name: user.name,
      email: user.email,
      description: user.description,
      type: user.type,
    })
    setEditable(!editable)
  }
  const me = useSelector((state: any) => state.authenticatedUser)
  const isMe = me.id === user?.id
  const [editable, setEditable] = useState(false)
  const handleClick = () => setEditable(!editable)
  const Editable = ({ children, ...rest }: any) => {
    const Text = rest?.rows ? (
      <Controller
        as={
          <TextField
            id="outlined-multiline-static"
            label={rest.label}
            multiline
            fullWidth
            rows={rest?.rows}
            defaultValue={children.props.children}
            variant="outlined"
            style={{ padding: '10px' }}
            size="small"
          />
        }
        name={rest.label}
        control={control}
      />
    ) : (
      <Controller
        as={
          <TextField
            id="outlined"
            label={rest.label}
            fullWidth
            defaultValue={children.props.children}
            variant="outlined"
            style={{ padding: '10px' }}
            size="small"
          />
        }
        name={rest.label}
        control={control}
      />
    )
    return editable ? Text : children
  }

  const Name = () => (
    <Editable label="name">
      <Typography gutterBottom variant="subtitle1">
        {user?.name}
      </Typography>
    </Editable>
  )
  const Email = () => (
    <Editable label="email">
      <Typography gutterBottom variant="subtitle2">
        {user?.email}
      </Typography>
    </Editable>
  )
  const Description = () => (
    <Editable label="description" rows={3}>
      <Typography variant="body2" gutterBottom>
        {user?.description}
      </Typography>
    </Editable>
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
  const SaveButton = () => {
    return (
      <Button onClick={handleSubmit(saveUser)} color="secondary">
        Save
      </Button>
    )
  }
  const EditButton = () => {
    return (
      <Button onClick={handleClick} color="primary">
        Edit
      </Button>
    )
  }
  const CancelButton = () => {
    return (
      <Button onClick={handleClick} color="default">
        Cancel
      </Button>
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
          <Grid item xs>
            <form onSubmit={handleSubmit(saveUser)}>
              <Name />
              <Email />
              <Description />
              <ID />
              <Type />
            </form>
          </Grid>

          {isMe ? (
            <Grid item container alignItems="flex-end" justify="flex-end">
              {editable ? undefined : <EditButton />}
              {editable ? <CancelButton /> : undefined}
              {editable ? <SaveButton /> : undefined}
            </Grid>
          ) : undefined}
        </Grid>
      </Grid>
    </Grid>
  )
}

function UserProfile() {
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

export default UserProfile
