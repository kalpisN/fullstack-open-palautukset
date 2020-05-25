import userService from '../services/users'

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        console.log(users)

        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}

const userReducer = (state = [], action) => {
    console.log('users: ', state)
    console.log(action)
    switch(action.type) {
    case 'INIT_USERS':
        return action.data

    default:
        return state
    }
}

export default userReducer