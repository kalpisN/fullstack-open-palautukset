import React from 'react'
import { useSelector } from 'react-redux'

import ListGroup from 'react-bootstrap/ListGroup'

const Blogs = () => {

    const blogs = useSelector(state => state.blogs)

    return (
        <ListGroup className="bloglist">
            {blogs.map(blog =>
                <ListGroup.Item action href={`/blogs/${blog.id}`} variant="light" key={blog.id} className='blog'>{blog.title}</ListGroup.Item>
            )}
        </ListGroup>
    )
}


export default Blogs
