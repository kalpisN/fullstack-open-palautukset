import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [showAll, setShowAll] = useState(false)

  return (
    <div>
      {showAll === false ?
        <div className="blog" key={blog.id}>
          <p>{blog.title}<button onClick={() => setShowAll(true)}>view</button></p>
        </div>
        :
        <div className="blog" key={blog.id}>
          <p>{blog.title}<button onClick={() => setShowAll(false)}>hide</button></p>
          <p>{blog.url}</p>
          <p>likes: {blog.likes} <button>likes</button></p>
          <p>{blog.author}</p>

        </div>
      }
    </div>
  )
}
export default Blog
