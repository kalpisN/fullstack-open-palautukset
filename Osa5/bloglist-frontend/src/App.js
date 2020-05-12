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
        setBlogs(blogs)
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

    } catch (exception) {
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

  const addNewBlog = async (blogObject) => {

    try {
      myRef.current.toggleVisibility()
      await blogService
        .create(blogObject)
      setBlogs(blogs.concat(blogObject))
      notification(`a new blog ${blogObject.title} by ${blogObject.author} was added to bloglist!`, false)


    }
    catch (error) {
      notification(error.message, true)
    }
  }



  return (
    <div>
      {user === null ?
        <div>

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
        <button onClick={handleLogout}>Logout</button>
          </h3>

          <Togglable ref={myRef} buttonLabel='new blog'>
            <NewBlogForm createBlog={addNewBlog} />
          </Togglable>

          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}


        </div>
      }
    </div>
  )
}

export default App