import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Grid, Avatar, Container, CardActionArea } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People'
const useStyles = makeStyles((theme) => ({
  actionArea: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '120px',
    height: '120px',
    transitionDuration: '0.3s',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
    margin: 'auto',
  },
}))

const Home = () => {
  const classes = useStyles()
  const history = useHistory()
  const handleClick = () => {
    history.replace('/users')
  }

  const CardOne = () => (
    <Container component="main" maxWidth="xs">
      <Card>
        <CardActionArea className={classes.actionArea} onClick={handleClick}>
          <Avatar className={classes.avatar}>
            <PeopleIcon fontSize="large" />
          </Avatar>
          <Typography color="textSecondary" gutterBottom>
            Users
          </Typography>
        </CardActionArea>
      </Card>
    </Container>
  )

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Home
      </Typography>
      <Grid container direction="row" justify="flex-start" spacing={1}>
        <Grid item>
          <CardOne />
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
