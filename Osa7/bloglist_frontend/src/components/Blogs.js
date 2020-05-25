import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {

    const blogs = useSelector(state => state.blogs)

    return (
        <div id='blogs'>
            {blogs.map(blog =>
                <p key={blog.id} className='blog'><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></p>
            )}
        </div>
    )
}


export default Blogs