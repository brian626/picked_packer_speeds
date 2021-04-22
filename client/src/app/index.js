import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { NavBar } from '../components'
import { Login, Dashboard, UsersList, UsersInsert, UsersUpdate, Analytics } from '../pages'
import { LoggedInRoute, SupervisorRoute } from '../components'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact render={ () => {
                    return ( <Redirect to="/login" /> )
                }}/>
                <Route path="/login" exact component={Login} />
                {/* <Route path="/logout" exact component={Logout} /> */}
                <LoggedInRoute path="/dashboard" exact component={Dashboard} />
                <LoggedInRoute path="/analytics" exact component={Analytics} />
                <SupervisorRoute path="/users/list" exact component={UsersList} />
                <LoggedInRoute path="/users/create" exact component={UsersInsert} />
                <LoggedInRoute path="/users/update/:id" exact component={UsersUpdate} />
            </Switch>
        </Router>
    )
}
export default App
