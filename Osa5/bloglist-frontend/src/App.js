import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('err')

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

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
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

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {

      await blogService
        .create(blogObject)
          setBlogs(blogs.concat(blogObject))
          notification(`a new blog ${blogObject.title} by ${blogObject.author} was added to bloglist!`, false)
    
    }
    catch (error) {
      
      notification(error.message, true)

    }

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }



return (
  <div>
    {user === null ?
      <div>
      <Notification className={messageType} message={message}/>
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
        <Notification className={messageType} message={message}/>
        <h3>{user.name} logged in
        <button onClick={handleLogout}>Logout</button>
        </h3>
        <div>
        <NewBlogForm onSubmit={addNewBlog}
          onTitleChange={handleTitleChange}
          onAuthorChange={handleAuthorChange}
          onUrlChange={handleUrlChange}
          title={newTitle}
          author={newAuthor}
          url={newUrl}

        />
        </div>
        <div>
        {blogs.map(blog =>
          <Blog key={blog._id} blog={blog} />
        )}
        </div>
        </div>
    }
  </div>
)
  }

export default App