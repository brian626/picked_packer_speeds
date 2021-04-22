import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import ls from 'local-storage'
import styled from 'styled-components'

import api from '../api'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
        }
    }

    handleChangeInputEmail = async event => {
        const email = event.target.value
        this.setState({ email })
    }

    handleChangeInputPassword = async event => {
        const password = event.target.value
        this.setState({ password })
    }

    handleLogin = async () => {
        const { email, password } = this.state
        const payload = { email, password }

        await api.login(payload).then(res => {
            ls.set('isSupervisor', res.data.data.isSupervisor)
            this.props.handleLoggedInChange(true)
        })
    }

    render() {
        const { email, password } = this.state
        const lsLoggedIn = ls.get('loggedIn')

        if (lsLoggedIn) {
            return <Redirect to="/dashboard" />
        }
        else {
            return (
                <Wrapper>
                    <Title>Login</Title>

                    <Label>Email: </Label>
                    <InputText
                        type="text"
                        value={email}
                        onChange={this.handleChangeInputEmail}
                    />

                    <Label>Password: </Label>
                    <InputText
                        type="password"
                        value={password}
                        onChange={this.handleChangeInputPassword}
                    />

                    <Button onClick={this.handleLogin}>Login</Button>
                    <CancelButton href={'/'}>Cancel</CancelButton>
                </Wrapper>
            )
        }
    }
}

export default Login
