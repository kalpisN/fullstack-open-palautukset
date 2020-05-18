

export const setNotification = (message) => {
    return {
        type: 'SET_MESSAGE',
        message
    }
}

const notificationReducer = (state = null, action) => {

    console.log(action)
    switch (action.type) {
        case 'SET_MESSAGE':
           state = action.message
            console.log(state)
         return state

        default:
            return state
    }
}

export default notificationReducer