
const initialState = { message: null, messageType: 'error' }
let timeOutID

export const setNotification = (message, messageType) => {
    clearTimeout(timeOutID)
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            data: { message: message, messageType: messageType }
        })

        timeOutID = setTimeout(() => {
            dispatch({
                type: 'SET_MESSAGE',
                data: { message: null, messageType: '' }
            })
        }, 5000)
    }
}

const notificationReducer = (state = initialState, action) => {
    console.log(state)

    switch (action.type) {
    case 'SET_MESSAGE':
        state = action.data
        console.log(state)
        return state

    default:
        return state
    }
}

export default notificationReducer