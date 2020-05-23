import React, { useState } from 'react'
import {
  Button,
  TextField,
  InputAdornment,
  Typography,
  Link,
  CssBaseline,
  Avatar,
  makeStyles,
  Container,
  FormControlLabel,
  Grid,
  Box,
  Checkbox,
} from '@material-ui/core'
import { useForm, Controller } from 'react-hook-form'
import {
  Visibility,
  VisibilityOff,
  MailOutline,
  Lock as LockIcon,
} from '@material-ui/icons'
import { toClicable } from './toClicable'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as loginApi } from 'apis/auth'
import { setUser } from 'reducers/authenticate'
import { Copyright } from './Copyright'
import GoogleLogin from 'react-google-login'
import { IUser } from 'components/users/IUser'

type Inputs = {
  email: string
  password: string
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  googleLogin: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
}))

export function LoginPage() {
  const classes = useStyles()

  const { handleSubmit, control, errors, setError } = useForm<Inputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const history = useHistory()
  const { from }: any = history.location.state || {
    from: { pathname: '/' },
  }
  const dispatch = useDispatch()
  const login = async (data: Inputs) => {
    try {
      const user = await loginApi(data)
      dispatch(setUser(user))
      history.replace(from)
    } catch (e) {
      console.log(e)
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
    }
  }
  const responseGoogle = (response: any) => {
    console.log(responseGoogle)
    const user: IUser = {
      id: response.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
      type: 'admin',
    }
    dispatch(setUser(user))
    history.replace(from)
  }

  const [visiblePassword, setPasswordVisible] = useState(false)
  const handleClick = () => setPasswordVisible(!visiblePassword)

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(login)} className={classes.form}>
            <Controller
              as={
                <TextField
                  label="メールアドレス"
                  error={!!errors.email}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  required
                  helperText={errors.email?.message || ''}
                  autoComplete="email"
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
              defaultValue="usera@email.com"
              rules={{ required: '必須です。' }}
            />
            <Controller
              as={
                <TextField
                  label="パスワード"
                  error={!!errors.password}
                  variant="outlined"
                  margin="normal" // or dense
                  fullWidth
                  required
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
            {/* TODO: BELOW */}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Controller
              as={
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
              }
              name="submit"
              control={control}
              defaultValue=""
              onClick={handleSubmit(login)}
            />
            <GoogleLogin
              clientId="807822853495-o4cg5ie3t3qo93ou11j7uf7t6it04rc4.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              className={classes.googleLogin}
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  )
}
