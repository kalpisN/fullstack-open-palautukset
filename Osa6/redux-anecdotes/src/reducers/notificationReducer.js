
let timeOutID;

export const setNotification = (message, timeout) => {
    clearTimeout(timeOutID)
    return async dispatch => {
        
        dispatch({
        type: 'SET_MESSAGE',
        message
        })
        
        timeOutID = setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE',
                message: null
            })
        }, timeout * 1000)
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