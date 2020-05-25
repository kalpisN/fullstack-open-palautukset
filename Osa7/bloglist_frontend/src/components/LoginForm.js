import React from 'react'
import { useField } from '../hooks/index'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'


const LoginForm = () => {

    const username = useField('text')
    const password = useField('password')

    const dispatch = useDispatch()

    const handleLogin = async (event) => {
        event.preventDefault()
        dispatch(login(username.value, password.value))
            .then(dispatch(setNotification(null, '')))
            .catch(error => dispatch(setNotification('wrong username or password', 'err')))
    }

    return (
        <>
            <h2>Login to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input {...username} />
                </div>
                <div>
                    password
                    <input {...password} />
                </div>
                <button id='login' type="submit">login</button>
            </form>
        </>
    )
}

export default LoginForm
