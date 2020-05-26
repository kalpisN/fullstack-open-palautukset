import React from 'react'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import './LoginPage.css'


const LoginPage = () => {

    const username = useField('text')
    const password = useField('password')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(login(username.value, password.value))
            .then(loggedUser => dispatch(setNotification(`Welcome, ${username.value}`, 'success')))
            .catch(error => dispatch(setNotification('wrong username or password', 'error')))
    }

    return (
        <div className ="login">
            <h2 className="header">Login to application</h2>
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formBasicUsername">
                    <Form.Label><b>Username</b></Form.Label>
                    <Form.Control {...username} placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label><b>Password</b></Form.Label>
                    <Form.Control {...password} placeholder="Password" />
                </Form.Group>
                <Button className="loginButton" variant="outline-dark" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    )
}

export default LoginPage


