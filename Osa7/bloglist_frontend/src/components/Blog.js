import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, remove, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/userReducer'
import { loggedUser } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import Comments from './Comments'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loggedUser())
        dispatch(initializeBlogs())
        dispatch(initializeUsers())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    const loggeduser = useSelector(state => state.loggeduser)

    const addLike = (event) => {
        event.preventDefault()
        const id = event.target.value
        const blog = blogs.find(b => b.id === id)
        const blogObject = {
            ...blog,
            likes: blog.likes + 1
        }
        dispatch(updateBlog(id, blogObject))
            .catch(error => dispatch(setNotification(error.message, 'danger')))

    }

    const history = useHistory()
    const removeBlog = (event) => {
        const id = event.target.value
        const blog = blogs.find(b => b.id === id)
        console.log(blog)

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            dispatch(remove(id))
                .then(removedBlog => {
                    dispatch(setNotification(`${blog.title} by ${blog.author} removed succesfully`, 'success'))
                    dispatch(initializeUsers())
                })
                .catch(error => setNotification(error.message, 'danger'))
        }
        history.push('/')
    }
    if (!blog) {
        return null
    }

    return (
        <>
            <ListGroup className="blog" key={blog.id}>

                <ListGroup.Item className="blogheader" variant="dark">{blog.title}, {blog.author}</ListGroup.Item>
                <ListGroup.Item action href={blog.url} variant="light">{blog.url}</ListGroup.Item>
                <ListGroup.Item variant="light">{blog.likes} likes {' '}
                </ListGroup.Item>
                <ListGroup.Item variant="light">blog added by {blog.user.name}</ListGroup.Item>
            </ListGroup>
            <Button className='likeButton' size="sm" variant="outline-dark" value={blog.id} onClick={addLike}>like</Button>
            {loggeduser.id === blog.user.id ? <Button className="removeButton" size="sm" variant="outline-dark" value={blog.id} onClick={removeBlog}>remove</Button>
                : <></>}
            <Comments id={blog.id} />
        </>
    )
}


export default Blog
