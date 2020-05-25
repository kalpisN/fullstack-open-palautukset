import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './Blog'
import { updateBlog, remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/userReducer'

const Blogs = () => {

    const state = useSelector(state => state)
    const dispatch = useDispatch()

    const addLike = (id) => {
        const blog = state.blogs.find(b => b.id === id)
        const blogObject = {
            ...blog,
            likes: blog.likes + 1
        }
        dispatch(updateBlog(id, blogObject))
            .catch(error => setNotification(error.message, 'err'))
    }

    const removeBlog = (id) => {
        const blog = state.blogs.find(b => b.id === id)
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

    return (
        <div id='blogs'>
            {state.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} removeBlog={removeBlog} addLike={addLike} />
            )}
        </div>
    )
}


export default Blogs