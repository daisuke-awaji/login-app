import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { Grid, CardActionArea, Container, Avatar } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import PeopleIcon from '@material-ui/icons/People'
const useStyles = makeStyles((theme) => ({
  actionArea: {
    display: 'block',
    width: '20vw',
    transitionDuration: '0.3s',
    height: '20vw',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: 28,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.primary.main,
    width: '80px',
    height: '80px',
  },
}))

export const Home = () => {
  const classes = useStyles()
  const history = useHistory()
  const handleClick = () => {
    history.replace('/users')
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Home
      </Typography>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Card>
          <CardActionArea className={classes.actionArea} onClick={handleClick}>
            <Container component="main" maxWidth="xs" className={classes.title}>
              <Avatar className={classes.avatar}>
                <PeopleIcon fontSize="large" />
              </Avatar>
              <Typography color="textSecondary" gutterBottom>
                Users
              </Typography>
            </Container>
          </CardActionArea>
        </Card>
      </Grid>
    </div>
  )
}
