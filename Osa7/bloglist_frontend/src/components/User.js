import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const User = ({ user }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    if (!user) {
        return null
    }
    return (
        <div>
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {user.blogs.map(blog =>
                <li key={blog.id}>{blog.title}</li>)}
        </div>
    )

}

export default User