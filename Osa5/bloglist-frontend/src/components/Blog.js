import React from 'react'
const Blog = ({ key, blog }) => (
  <ul key={key}>
    {blog.title} {blog.author}
  </ul>
)

export default Blog
