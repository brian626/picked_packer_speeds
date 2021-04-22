import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ls from 'local-storage'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loggedIn: ls.get('loggedIn'),
            isSupervisor: ls.get('isSupervisor')
        }
    }

    handleLogout = async () => {
        ls.remove('isSupervisor')
        ls.remove('loggedIn')
        // this.state.loggedIn = false
        this.setState({ "loggedIn": false })
    }

    render() {
        const { loggedIn, isSupervisor } = this.state

        var loginItem
        var analyticsItem
        if (loggedIn) {
            loginItem =
                <Item>
                    <Link to="/login" className="nav-link" onClick={this.handleLogout}>
                        Logout
                    </Link>
                </Item>
            analyticsItem =
                <Item>
                    <Link to="/analytics" className="nav-link">
                        Analytics
                    </Link>
                </Item>
        } else {
            loginItem =
                <Item>
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </Item>
        }

        var listUsersItem
        var createUsersItem
        if (isSupervisor) {
            listUsersItem =
                <Item>
                    <Link to="/users/list" className="nav-link">
                        List Users
                    </Link>
                </Item>

            createUsersItem =
                <Item>
                    <Link to="/users/create" className="nav-link">
                        Create Users
                    </Link>
                </Item>
        }

        return (
            <React.Fragment>
                <Link to="/" className="navbar-brand">
                    Picker/Packer Speeds
                </Link>
                <Collapse>
                    <List>
                        {listUsersItem}
                        {createUsersItem}
                        {analyticsItem}
                        {loginItem}
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
