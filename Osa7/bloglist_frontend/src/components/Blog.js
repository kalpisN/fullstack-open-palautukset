import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, remove, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/userReducer'
import { loggedUser } from '../reducers/loginReducer'
import { useHistory } from 'react-router-dom'
import Comments from './Comments'
import Button from 'react-bootstrap/Button'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

const Blog = ({ blog }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loggedUser())
        dispatch(initializeBlogs())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    const loggeduser = useSelector(state => state.loggeduser)

    const addLike = (event) => {
        const id = event.target.value
        const blog = blogs.find(b => b.id === id)
        const blogObject = {
            ...blog,
            likes: blog.likes + 1
        }
        dispatch(updateBlog(id, blogObject))
            .catch(error => dispatch(setNotification(error.message, 'error')))
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
                .catch(error => setNotification(error.message, 'error'))
        }
        history.push('/')
    }
    if (!blog) {
        return null
    }

    return (
        <>
            <div id="blog" key={blog.id} className="blog">
                <h2>{blog.title}, {blog.author}</h2>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p>{blog.likes} likes <Button id='like' value={blog.id} onClick={addLike} size="sm" variant="light"><ThumbUpAltOutlinedIcon/></Button></p>
                <p>added by {blog.user.name}</p>
                {loggeduser.id === blog.user.id ? <p><Button value={blog.id} onClick={removeBlog} type="submit" size="sm" variant="outline-dark">remove</Button>
                </p> : <p></p>}
            </div>
            <Comments id={blog.id}/>
        </>
    )
}

export default Blog
