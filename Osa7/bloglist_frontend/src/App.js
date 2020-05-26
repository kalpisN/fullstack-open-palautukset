import React, { useEffect } from 'react'
import LoginPage from './components/LoginPage'
import NewBlogForm from './components/NewBlogForm'
import Blogs from './components/Blogs'
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
import Blog from './components/Blog'
import Navigation from './components/Navigation'


const App = () => {

    const loggeduser = useSelector(state => state.loggeduser)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loggedUser())
        dispatch(initializeBlogs())
    }, [dispatch])

    const matchUser = useRouteMatch('/users/:id')
    const user = matchUser
        ? users.find(user => user.id === matchUser.params.id)
        : null

    const matchBlog = useRouteMatch('/blogs/:id')
    const blog = matchBlog
        ? blogs.find(blog => blog.id === matchBlog.params.id)
        : null

    return (
        <>
            {loggeduser === null ?
                <div>
                    <Notification />
                    <LoginPage />
                </div>
                :
                <div>
                    <Navigation/>
                    <Notification />
                    <Switch>
                        <Route path="/users/:id">
                            <User user={user} />
                        </Route>
                        <Route path='/users'>
                            <Users />
                        </Route>
                        <Route path='/blogs/:id'>
                            <Blog blog={blog}/>
                        </Route>
                        <Route path="/">
                            <Blogs />
                            <NewBlogForm />
                        </Route>
                    </Switch>
                </div>
            }
        </>
    )
}

export default App