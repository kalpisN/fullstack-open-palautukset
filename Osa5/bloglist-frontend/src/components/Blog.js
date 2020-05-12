import React, { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {

  const [showAll, setShowAll] = useState(false)
  const [likes, setLikes] = useState(null)


  const addLike = (event) => {
    console.log(event.target.value)
    console.log(event.target.id)
    event.preventDefault()

    setLikes(event.target.likes+1)
    updateBlog({
      id: event.id,
      likes: likes
    })   
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
          <p>likes: {blog.likes} <button id={blog.id} value={blog.likes} onClick={addLike}>likes</button></p>
          <p>{blog.author}</p>

        </div>
      }
    </div>
  )
}
export default Blog
