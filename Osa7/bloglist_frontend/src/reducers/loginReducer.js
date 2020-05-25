import loginService from '../services/login'
import blogService from '../services/blogs'

export const loggedUser = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const loggeduser = JSON.parse(loggedUserJSON)
            console.log(loggeduser)
            blogService.setToken(loggeduser.token)
            dispatch({
                type: 'LOGGED_USER',
                data: loggeduser
            })
        }
    }
}

export const login = (username, password) => {
    return async dispatch => {
        const loggeduser = await loginService.login({ username, password })
        window.localStorage.setItem(
            'loggedUser', JSON.stringify(loggeduser)
        )
        blogService.setToken(loggeduser.token)
        dispatch({
            type: 'LOGIN',
            data: loggeduser
        })
    }
}

export const logout = () => {
    window.localStorage.removeItem('loggedUser')
    return { type: 'LOGOUT', data: null }
}

const loginReducer = (state = null, action) => {

    switch (action.type) {
    case 'LOGIN':
        return action.data

    case 'LOGOUT':
        return action.data

    case 'LOGGED_USER':
        return action.data

    default:
        return state
    }
}

export default loginReducer