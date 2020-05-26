import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
import { loggedUser } from '../reducers/loginReducer'
import Table from 'react-bootstrap/Table'

const Users = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
        dispatch(loggedUser())
    }, [dispatch])


    const users = useSelector(state => state.users.sort((a, b) => b.blogs.length - a.blogs.length))

    return (
        <div>
            <h2 className="header">USERS</h2>
            <Table className="users" striped bordered hover size="sm">
                <thead><tr><th>User</th><th>Blogs created</th></tr></thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Users

