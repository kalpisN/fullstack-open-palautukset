import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'


const LoginForm = (props) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            props.login(username, password)
            setUsername('')
            setPassword('')

        } catch (exeption) {
            setNotification('wrong username or password', 'err')
        }
    }

    return (
        <>
            <h2>Login to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        id='username'
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        id='password'
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button id='login' type="submit">login</button>
            </form>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification,
        user: state.user
    }
}

const mapDispatchToProps = {
    setNotification,
    login
}

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToProps)(LoginForm)
export default ConnectedLoginForm
