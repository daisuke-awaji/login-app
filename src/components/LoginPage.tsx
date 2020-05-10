import React, { useState } from 'react'
import { Button, TextField, InputAdornment } from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import { Visibility, VisibilityOff, MailOutline } from '@material-ui/icons'
import { toClicable } from './toClicable'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { AUTHENTICATE } from 'reducers/authenticate'

type Inputs = {
  email: string
  password: string
}

function LoginPage() {
  const { handleSubmit, control, errors, setError } = useForm<Inputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const history = useHistory()
  const { from }: any = history.location.state || {
    from: { pathname: '/' },
  }
  const dispatch = useDispatch()
  const login = (data: Inputs) => {
    // TODO: 認証APIを実行する
    const valid = (data: Inputs) => {
      const { email, password } = data
      if (email !== 'example@email.com' || password !== 'a') {
        setError(
          'email',
          'hasAnyError',
          'メールアドレスまたはパスワードが不正です。',
        )
        setError(
          'password',
          'hasAnyError',
          'メールアドレスまたはパスワードが不正です。',
        )
        return false
      }
      return true
    }
    if (valid(data)) {
      dispatch({ type: AUTHENTICATE })
      history.replace(from)
    }
  }

  const [visiblePassword, setPasswordVisible] = useState(false)
  const handleClick = () => setPasswordVisible(!visiblePassword)

  return (
    <form onSubmit={handleSubmit(login)}>
      <h3>Login</h3>
      <Controller
        as={
          <TextField
            label="メールアドレス"
            error={!!errors.email}
            variant="outlined"
            margin="dense"
            helperText={errors.email?.message || ''}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutline />
                </InputAdornment>
              ),
            }}
          />
        }
        name="email"
        control={control}
        defaultValue="example@email.com"
        rules={{ required: '必須です。' }}
      />
      <br />
      <Controller
        as={
          <TextField
            label="パスワード"
            error={!!errors.password}
            variant="outlined"
            margin="dense"
            helperText={errors.password?.message || ''}
            type={visiblePassword ? 'default' : 'password'}
            autoComplete="current-password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {visiblePassword
                    ? toClicable(VisibilityOff, handleClick)
                    : toClicable(Visibility, handleClick)}
                </InputAdornment>
              ),
            }}
          />
        }
        name="password"
        control={control}
        // Reactのフォームコンポーネントは、
        // 割り当てられているStateの値がnullかundefinedになると、uncontrolledになってしまうので注意
        defaultValue=""
        rules={{ required: '必須です。' }}
      />
      <br />
      <Controller
        as={
          <Button color="primary">
            <span>Login</span>
          </Button>
        }
        name="submit"
        control={control}
        defaultValue=""
        onClick={handleSubmit(login)}
      />
    </form>
  )
}

export default LoginPage
