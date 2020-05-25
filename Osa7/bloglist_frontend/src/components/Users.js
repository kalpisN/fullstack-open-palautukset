import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'
/* import { loggedUser } from '../reducers/loginReducer' */

const Users = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
        /* dispatch(loggedUser()) */
    }, [dispatch])


    const users = useSelector(state => state.users.sort((a, b) => b.blogs.length - a.blogs.length))

    return (
        <div>
            <h1>Users</h1>
            <table>
                <thead><tr><th></th><th>blogs created</th></tr></thead>
                <tbody>
                    {users.map(user =>
                        <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Users
