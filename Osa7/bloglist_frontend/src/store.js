import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import commentReducer from './reducers/commentReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    loggeduser: loginReducer,
    users: userReducer,
    comments: commentReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

export default store