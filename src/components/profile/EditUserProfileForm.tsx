import React from 'react'
import { IUser } from 'components/users/IUser'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { thunkedUpdateUserAction } from 'reducers/users'
import { Button, TextField, Grid } from '@material-ui/core'

export const EditUserProfileForm: React.FunctionComponent<{
  user: IUser
  setEditable: any
}> = ({ user, setEditable }) => {
  const { handleSubmit, control, register } = useForm<IUser>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })
  const dispatch = useDispatch()
  const saveUser = (user: IUser) => {
    dispatch(thunkedUpdateUserAction(user))
    setEditable(false)
  }
  const SaveButton = () => (
    <Button onClick={handleSubmit(saveUser)} color="secondary">
      Save
    </Button>
  )
  const CancelButton = () => (
    <Button onClick={() => setEditable(false)} color="default">
      Cancel
    </Button>
  )
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
      <Grid item container alignItems="flex-end" justify="flex-end">
        <CancelButton />
        <SaveButton />
      </Grid>
      <input ref={register} type="hidden" name="type" value={user?.type} />
      <input ref={register} type="hidden" name="img" value={user?.img} />
    </form>
  )
}
