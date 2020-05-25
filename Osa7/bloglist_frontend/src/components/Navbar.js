import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Navbar = () => {

    const dispatch = useDispatch()
    const loggeduser = useSelector(state => state.loggeduser)
    const handleLogout = async (event) => {
        event.preventDefault()
        dispatch(logout())

    }
    return(
        <div>
            <Link to='/'>Blogs</Link>
            <Link to='/users'>Users</Link>
            <b>{loggeduser.name} logged in</b> <button id='logout' onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default Navbar