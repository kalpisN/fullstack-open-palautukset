
const initialState = { message: null, messageType: '' }

export const setNotific = (message, messageType) => {

    return { type: 'SET_MESSAGE',
        data: { message: message, messageType: messageType }
    }

}

const notificationReducer = (state = initialState, action) => {

    console.log(action)
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