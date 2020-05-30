import React, { useState, useEffect } from 'react'
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
import { Visibility, VisibilityOff, MailOutline } from '@material-ui/icons'
import { toClickable } from './toClickable'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { thunkedLoginAction } from 'reducers/authenticate'
import { Copyright } from './Copyright'
import { AvatarsAnimation } from 'components/AvatarsAnimation'
import { useSelector } from 'react-redux'
import { AppState } from 'reducers/store'

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
    margin: theme.spacing(2),
    width: theme.spacing(9),
    height: theme.spacing(9),
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

const Loading = () => <>Loading...</>

export function LoginPage() {
  const classes = useStyles()

  const [visiblePassword, setPasswordVisible] = useState(false)
  const handleClick = () => setPasswordVisible(!visiblePassword)

  const { handleSubmit, control, errors, setError } = useForm<Inputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  })

  const history = useHistory()

  const dispatch = useDispatch()
  const login = (data: Inputs) => {
    dispatch(thunkedLoginAction(data))
  }
  const auth = useSelector((state: AppState) => state.authenticatedUser)
  useEffect(() => {
    if (auth.user) {
      const { from }: any = history.location.state || {
        from: { pathname: '/' },
      }
      history.replace(from)
    }
    if (auth.error) {
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
  })
  if (auth.isFetching) {
    return <Loading />
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AvatarsAnimation />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form}>
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
              defaultValue=""
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
                          ? toClickable(VisibilityOff, handleClick)
                          : toClickable(Visibility, handleClick)}
                      </InputAdornment>
                    ),
                  }}
                />
              }
              name="password"
              control={control}
              // Reactのフォームコンポーネントは、
              // 割り当てられているStateの値がnullかundefinedになると、uncontrolledになってしまうので注意
              // https://github.com/react-hook-form/react-hook-form-website/issues/133
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
