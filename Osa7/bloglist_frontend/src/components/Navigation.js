import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Navigation = () => {

    const dispatch = useDispatch()
    const loggeduser = useSelector(state => state.loggeduser)
    const handleLogout = async (event) => {
        event.preventDefault()
        dispatch(logout())

    }
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Blog App</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Blogs</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                </Nav>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        {loggeduser.name} logged in
                    </Navbar.Text>
                    <Button variant="outline-info" onClick={handleLogout}>Logout</Button>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default Navigation
