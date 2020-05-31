import React from 'react'
import { IUser } from 'components/users/IUser'
import { Typography, Button, Grid } from '@material-ui/core'
import { useSelector } from 'react-redux'

export const UserProfileTexts: React.FunctionComponent<{
  user: IUser
  setEditable: any
}> = ({ user, setEditable }) => {
  const auth = useSelector((state: any) => state.authenticatedUser)
  const isMe = auth.user.id === user?.id
  const EditButton = () => {
    // コンポーネントのレンダーを防ぐには null を返す。undefinedではダメ。
    // https://ja.reactjs.org/docs/conditional-rendering.html#preventing-component-from-rendering
    if (isMe) return null
    return (
      <Button onClick={() => setEditable(true)} color="primary">
        Edit
      </Button>
    )
  }
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
      <Grid item container alignItems="flex-end" justify="flex-end">
        <EditButton />
      </Grid>
    </>
  )
}
