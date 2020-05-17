import React from 'react'
import {
  Typography,
  Container,
  makeStyles,
  CssBaseline,
  Button,
} from '@material-ui/core'
import { useHistory } from 'react-router'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles((theme) => ({
  main: {
    textAlign: 'center',
    marginTop: theme.spacing(8),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

export function NotFound() {
  const history = useHistory()
  const handleClickBackButton = () => {
    history.replace({ pathname: '/' })
  }
  const classes = useStyles()
  return (
    <div className={classes.main}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Typography variant="h1" component="h1">
          404
        </Typography>
        <Typography variant="h5">
          Not found{' '}
          <span role="img" aria-label="sad">
            😢
          </span>
        </Typography>
        <Typography>It looks like you're lost.</Typography>
        <br />
        <Button
          color="secondary"
          size="medium"
          variant="outlined"
          className={classes.button}
          onClick={handleClickBackButton}
          startIcon={<HomeIcon />}
        >
          back to my app
        </Button>
      </Container>
    </div>
  )
}
