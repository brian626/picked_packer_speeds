import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import ls from 'local-storage'

class LoggedInRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props

      return (
        <Route
          {...props}
          render={props => (
            ls.get('loggedIn') ?
              <Component {...props} /> :
              <Redirect to='/login' />
          )}
        />
      )
    }
  }

export default LoggedInRoute
