import React, { useState } from 'react'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {

    const showButton = {
        display: user === (blog.user.id || blog.user) ? '' : 'none'
    }

    const [showAll, setShowAll] = useState(false)


    const addLike = (event) => {
        updateBlog(event.target.value)
    }

    const remove = (event) => {
        console.log(user)
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
                    <p>likes: {blog.likes} <button id='like' value={blog.id} onClick={addLike}>like</button></p>
                    <p>
                        <button style={showButton} value={blog.id} onClick={remove}>remove</button>
                    </p>
                </div>
            }
        </div >
    )
}
export default Blog
