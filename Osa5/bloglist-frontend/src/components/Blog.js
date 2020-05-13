import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {

  const [showAll, setShowAll] = useState(false)
  
  const addLike = (event) => {

    updateBlog(event.target.value)
  
  }

  return (
    <div>
      {showAll === false ?
        <div className="blog" key={blog.id}>
          <p onClick={() => setShowAll(true)}>{blog.title}</p>
        </div>
        :
        <div className="blog" key={blog.id}>
          <p>{blog.title}<button onClick={() => setShowAll(false)}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button value={blog.id} onClick={addLike}>like</button></p>
          <p>{blog.author}</p>

        </div>
      }
    </div>
  )
}
export default Blog
