import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import ls from 'local-storage'

class SupervisorRoute extends Component {
    render() {
      const { component: Component, ...props } = this.props

      return (
        <Route
          {...props}
          render={props => (
            ls.get('isSupervisor') ?
              <Component {...props} /> :
              <Redirect to='/dashboard' />
          )}
        />
      )
    }
  }

export default SupervisorRoute
