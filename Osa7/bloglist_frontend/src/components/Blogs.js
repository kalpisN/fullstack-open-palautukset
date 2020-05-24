import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { updateBlog, remove } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = (props) => {

    const addLike = (id) => {
        const blog = props.blogs.find(b => b.id === id)
        const blogObject = {
            ...blog,
            likes: blog.likes + 1
        }
        props.updateBlog(id, blogObject)
            .catch(error => props.setNotification(error.message, 'err'))
    }

    const removeBlog = (id) => {
        const blog = props.blogs.find(b => b.id === id)
        console.log(blog)

        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
            props.remove(id)
                .then(removedBlog => props.setNotification(`${blog.title} by ${blog.author} removed succesfully`, 'success'))
                .catch(error => props.setNotification(error.message, 'err'))
        }
    }

    return (
        <div id='blogs'>
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={props.user.id} removeBlog={removeBlog} addLike={addLike} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs.sort((a, b) => b.likes - a.likes),
        notification: state.notification,
        user: state.user
    }
}
const mapDispatchToProps = {
    updateBlog,
    setNotification,
    remove
}

const ConnectedBlogs = connect(mapStateToProps, mapDispatchToProps)(Blogs)
export default ConnectedBlogs