import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, remove, initializeBlogs } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/userReducer'
import { loggedUser } from '../reducers/loginReducer'

const Blog = ({ blog }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loggedUser())
        dispatch(initializeBlogs())
    }, [dispatch])

    const blogs = useSelector(state => state.blogs)
    const loggeduser = useSelector(state => state.loggeduser)

    const addLike = async (event) => {
        const id = event.target.value
        const blog = blogs.find(b => b.id === id)
        const blogObject = {
            ...blog,
            likes: blog.likes + 1
        }
        await dispatch(updateBlog(id, blogObject))
            .catch(error => dispatch(setNotification(error.message, 'err')))
    }


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
                .catch(error => setNotification(error.message, 'err'))
        }
    }
    if (!blog) {
        return null
    }

    return (
        <>
            <div id="blog" key={blog.id} className="blog">
                <h2>{blog.title}, {blog.author}</h2>
                <p><a href={blog.url}>{blog.url}</a></p>
                <p>{blog.likes} likes <button id='like' value={blog.id} onClick={addLike}>like</button></p>
                <p>added by {blog.user.name}</p>
                {loggeduser.id === blog.user.id ? <p><button value={blog.id} onClick={removeBlog}>remove</button>
                </p> : <p></p>}
            </div>


        </>
    )
}

export default Blog
