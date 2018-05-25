import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router'
import { HashRouter, BrowserRouter } from 'react-router-dom'
import sio from 'socket.io-client'

import 'typeface-roboto'
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles'
import {
  CssBaseline,
  Snackbar,
} from '@material-ui/core'
import blue from '@material-ui/core/colors/blue'

import Home from 'containers/Home'

import { App } from 'stores'

const theme = createMuiTheme({
  palette: {
    primary: blue,
    background: {
      default: '#f3f3f3'
    },
  },
})

const styles = {
  message: {
    margin: 'auto'
  }
}

class Comp extends React.Component {
  handleClose = event => {
    const { dispatch } = this.props
    dispatch(App.update({
      message: ''
    }))
  }

  render() {
    const { classes, app } = this.props
    const RootRouter = window.location.href.indexOf('#') >= 0 ? HashRouter : BrowserRouter

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} ContentProps={{classes}} open={!!app.message} onClose={this.handleClose} message={app.message} />
        <RootRouter>
          <Switch>
            <Route path="/" component={Home} exact />
            <Redirect to="/" /> 
          </Switch>
        </RootRouter>
      </MuiThemeProvider>
    )
  }

  componentDidMount() {
    const socket = sio('/io')
    socket.on('session', (data) => {
      console.log(data)
    })
    window.socket = socket
  }
}

export default withStyles(styles)(connect(state => state)(Comp))
