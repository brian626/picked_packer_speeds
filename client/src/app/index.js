import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { NavBar } from '../components'
import { Login, Dashboard, UsersList, UsersInsert, UsersUpdate, Analytics } from '../pages'
import { LoggedInRoute, SupervisorRoute } from '../components'
import ls from 'local-storage'

import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.handleLoggedInChange = this.handleLoggedInChange.bind(this)
        this.state = { loggedIn: false }
    }

    handleLoggedInChange(l) {
        ls.set('loggedIn', l)
        this.setState({ loggedIn: l })
    }

    render() {
        const loggedIn = this.state.loggedIn

        return (
            <Router>
                <NavBar loggedIn={loggedIn} handleLoggedInChange={this.handleLoggedInChange} />
                <Switch>
                    <Route exact path="/" render={() => {
                        return <Redirect to="/login" />
                    }}/>
                    <Route exact path="/login" render={(props) => {
                        return( <Login loggedIn={loggedIn} handleLoggedInChange={this.handleLoggedInChange} {...props} /> )
                    }}/>
                    <LoggedInRoute path="/dashboard" exact component={Dashboard} />
                    <LoggedInRoute path="/analytics" exact component={Analytics} />
                    <SupervisorRoute path="/users/list" exact component={UsersList} />
                    <LoggedInRoute path="/users/create" exact component={UsersInsert} />
                    <LoggedInRoute path="/users/update/:id" exact component={UsersUpdate} />
                </Switch>
            </Router>
        )
    }
}

export default App
