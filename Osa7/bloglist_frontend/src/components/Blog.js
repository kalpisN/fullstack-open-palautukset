import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const Blog = ({ blog , addLike , removeBlog }) => {

    const loggeduser = useSelector(state => state.loggeduser)

    const showButton = {
        display: loggeduser.id === (blog.user.id || blog.user) ? '' : 'none'
    }

    const [showAll, setShowAll] = useState(false)


    const handleLike = (event) => {
        console.log(event.target.value)
        addLike(event.target.value)
    }

    const handleRemove = (event) => {
        console.log(loggeduser)
        removeBlog(event.target.value)
    }

    return (
        <div id="blog" className="blog">
            {showAll === false ?
                <div key={blog.id}>
                    <p>{blog.title}, {blog.author}<button id='view' onClick={() => setShowAll(true)} >view</button></p>
                </div>
                :
                <div key={blog.id}>
                    <p>Title: {blog.title}<button onClick={() => setShowAll(false)}>hide</button></p>
                    <p>Author: {blog.author}</p>
                    <p><a href={blog.url}>{blog.url}</a></p>
                    <p>likes: {blog.likes} <button id='like' value={blog.id} onClick={handleLike}>like</button></p>
                    <p>
                        <button style={showButton} value={blog.id} onClick={handleRemove}>remove</button>
                    </p>
                </div>
            }
        </div >
    )
}

export default Blog
