import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import ListGroup from 'react-bootstrap/ListGroup'

const User = ({ user }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    if (!user) {
        return null
    }
    return (
        <ListGroup className="user">
            <ListGroup.Item className="header2" variant="dark">{user.name} added blogs</ListGroup.Item>
            {user.blogs.map(blog =>
                <ListGroup.Item variant="light" key={blog.id}>{blog.title}</ListGroup.Item>)}
        </ListGroup>
    )

}

export default User