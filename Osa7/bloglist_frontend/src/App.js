import React, { useEffect } from 'react'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout, loggedUser } from './reducers/userReducer'


const App = () => {

    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    useEffect(() => {
        dispatch(loggedUser())
    }, [dispatch])

    const handleLogout = async (event) => {
        event.preventDefault()
        dispatch(logout())
    }


    return (
        <div>
            {user === null ?
                <div>
                    <Notification/>
                    <LoginForm/>
                </div>
                :
                <div>
                    <h1>Blogs</h1>
                    <Notification/>
                    <h3>{user.name} logged in
                        <button id='logout' onClick={handleLogout}>Logout</button>
                    </h3>
                    <NewBlogForm/>
                    <Blogs/>

                </div>
            }
        </div>
    )
}

export default App