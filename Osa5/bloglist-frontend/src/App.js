import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './App.css'


const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [messageType, setMessageType] = useState('err')

    const myRef = React.createRef()

    useEffect(() => {
        blogService.getAll()
            .then(blogs =>
                setBlogs(blogs.sort((a, b) => b.likes - a.likes))

            )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

        } catch (exeption) {
            notification('wrong username or password', true)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedUser')
        setUser(null)
    }

    const notification = (msg, err) => {
        if (err) {
            setMessageType('err')
        }
        else {
            setMessageType('success')
        }
        setMessage(msg)
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const addNewBlog = (blogObject) => {
        myRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(createdBlog => {
                setBlogs(blogs.concat(createdBlog))
                console.log(createdBlog)
                notification(`a new blog ${createdBlog.title} by ${createdBlog.author} was added to bloglist!`, false)
            })
            .catch(error => {
                notification(error.message, true)
            })
    }

    const updateBlog = (id) => {
        const blog = blogs.find(b => b.id === id)
        const blogObject = {
            ...blog,
            likes: blog.likes + 1
        }

        blogService
            .update(id, blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog).sort((a, b) => b.likes - a.likes))
            })
            .catch(error => {
                notification(error.message, true)
            })
    }

    const removeBlog = (id) => {

        const blog = blogs.find(b => b.id === id)
        console.log(blog)

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {

            blogService
                .remove(id)
                .then(response => {
                    setBlogs(blogs.filter(b => b.id !== id))
                    notification(`${blog.title} by ${blog.author} removed succesfully`)
                })

                .catch(error => {
                    notification(error.message, true)
                })
        }
    }

    return (
        <div>
            {user === null ?
                <div><Notification className={messageType} message={message} />
                    <LoginForm onSubmit={handleLogin}
                        username={username}
                        onUsernameChange={({ target }) => setUsername(target.value)}
                        password={password}
                        onPasswordChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                :
                <div>
                    <h1>Blogs</h1>
                    <Notification className={messageType} message={message} />
                    <h3>{user.name} logged in
                        <button id='logout' onClick={handleLogout}>Logout</button>
                    </h3>

                    <Togglable ref={myRef} buttonLabel='new blog'>
                        <NewBlogForm createBlog={addNewBlog} />
                    </Togglable>
                    <div id='blogs'>
                        {blogs.map(blog =>
                            <Blog removeBlog={removeBlog} updateBlog={updateBlog}
                                key={blog.id} blog={blog} user={user.id}/>
                        )}
                    </div>

                </div>
            }
        </div>
    )
}

export default App