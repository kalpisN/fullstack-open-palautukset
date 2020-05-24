import loginService from '../services/login'
import blogService from '../services/blogs'

export const loggedUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
            dispatch({
                type: 'LOGGED_USER',
                data: user
            })
        }
    }
}
export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password })
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedUser')
    return { type: 'LOGOUT', data: null }
}

const userReducer = (state = null, action) => {
    console.log('user', state)
    console.log('action', action)
    switch(action.type) {
    case 'LOGIN':
        return action.data

    case 'LOGOUT':
        state = null
        return state

    case 'LOGGED_USER':
        return action.data

    default:
        return state
    }
}

export default userReducer