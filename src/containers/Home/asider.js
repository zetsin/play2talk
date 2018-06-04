import React from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import {
  Hidden,
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Typography,
  Button,
  Tooltip,
} from '@material-ui/core'

import { App } from 'stores'

const styles = theme => ({
  root: {
    display: 'flex',
    overflow: 'scroll',
    borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
  },
  drawer: {
    flex: 1
  },
  paper: {
    position: 'static',
    height: '100%'
  },
  paper_temp: {
    width: '80%',
    [theme.breakpoints.up('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
    }
  },
  list: {
  },
})

class Comp extends React.Component {

  handleDrawerToggle = event => {
    const { dispatch, app } = this.props
    dispatch(App.update({
      asider_open: !app.asider_open
    }))
  }

  render() {
    const { classes, match, app, rooms, users } = this.props
    const { rid } = match.params
    const room = rooms[rid] || {}

    const drawer = (
      <List className={classes.list}>
        {Object.values(room.clients || {}).filter(uid => uid !== -1).map((uid, index) => {
          const member = users[uid] || {}
          return (
            <ListItem key={index} button>
              {member.image ? (
                <Avatar src={member.image} alt={member.displayName} component={Button} variant="fab" />
              ) : (
                <Avatar component={Button} variant="fab">{member.displayName ? member.displayName.slice(0, 1) : '+_+'}</Avatar>
              )}
              <ListItemText disableTypography primary={
                <Tooltip title={member.displayName || 'guest'}>
                  <Typography variant="subheading" noWrap>{member.displayName || 'guest'}</Typography>
                </Tooltip>
              } />
            </ListItem>
          )
        })}
      </List>
    )

    return (
      <React.Fragment>
        <Hidden smDown>
          {!app.asider_open ? (
            <Grid item sm={5} md={4} lg={3} className={classes.root}>
              <Drawer variant="permanent" open className={classes.drawer} classes={{
                paper: classes.paper,
              }}>
                {drawer}
              </Drawer>
            </Grid>
          ) : ''}
        </Hidden>
        <Hidden mdUp>
          <Drawer variant="temporary" anchor="right" open={app.asider_open} onClose={this.handleDrawerToggle} classes={{
            paper: classes.paper_temp,
          }} ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}>
            {drawer}
          </Drawer>
        </Hidden>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(connect(state => {
  const { app, rooms, users } = state
  return { app, rooms, users }
})(Comp))
