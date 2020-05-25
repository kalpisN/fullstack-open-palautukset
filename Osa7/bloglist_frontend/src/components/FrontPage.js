import React from 'react'
import NewBlogForm from './NewBlogForm'
import Blogs from './Blogs'
import { logout } from '../reducers/loginReducer'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './Notification'

const FrontPage = () => {

    const loggeduser = useSelector(state => state.loggeduser)
    const dispatch = useDispatch()

    const handleLogout = async (event) => {
        event.preventDefault()
        dispatch(logout())

    }

    return (
        <div>
            <h1>Blogs</h1>
            <Notification />
            <h3>{loggeduser.name} logged in
                <button id='logout' onClick={handleLogout}>Logout</button>
            </h3>
            <NewBlogForm />
            <Blogs />
        </div>
    )
}
export default FrontPage