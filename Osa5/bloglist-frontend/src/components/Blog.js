import React, { useState } from 'react'

const Blog = ({ user, blog, updateBlog, removeBlog }) => {

  const showButton = {
    display: user === blog.user.id ? "" : "none"
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
    <div className="blog">
      {showAll === false ?
        <div key={blog.id}>
          <p> {blog.title} <button onClick={() => setShowAll(true)}>view</button></p>
        </div>
        :
        <div key={blog.id}>
          <p>{blog.title}<button onClick={() => setShowAll(false)}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button value={blog.id} onClick={addLike}>like</button></p>
          <p>{blog.author}</p>
          <p>            
            <button style={showButton} value={blog.id} onClick={remove}>remove</button>
          </p>
        </div>
      }
    </div >
  )
}
export default Blog
