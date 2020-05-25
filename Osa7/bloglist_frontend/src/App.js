import React, { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import FrontPage from './components/FrontPage'
import Notification from './components/Notification'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { loggedUser } from './reducers/loginReducer'
import Users from './components/Users'
import {
    Switch, Route, useRouteMatch
} from 'react-router-dom'
import User from './components/User'


const App = () => {

    const loggeduser = useSelector(state => state.loggeduser)
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loggedUser())
        dispatch(initializeBlogs())
    }, [dispatch])

    const match = useRouteMatch('/users/:id')
    const user = match
        ? users.find(user => user.id === match.params.id)
        : null

    return (
        <div>
            {loggeduser === null ?
                <div>
                    <Notification/>
                    <LoginForm/>
                </div>
                :
                <div>
                    <Switch>
                        <Route path="/users/:id">
                            <User user={user}/>
                        </Route>
                        <Route path='/users'>
                            <Users/>
                        </Route>
                        <Route path="/">
                            <FrontPage/>
                        </Route>
                    </Switch>

                </div>
            }
        </div>
    )
}

export default App