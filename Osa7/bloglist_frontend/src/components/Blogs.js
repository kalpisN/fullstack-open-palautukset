import React from 'react'
import { useSelector } from 'react-redux'

import ListGroup from 'react-bootstrap/ListGroup'

const Blogs = () => {

    const blogs = useSelector(state => state.blogs)

    return (
        <ListGroup className="bloglist">
            <h2 className="header">BLOGS</h2>
            {blogs.map(blog =>
                <ListGroup.Item action href={`/blogs/${blog.id}`} variant="light" key={blog.id}>{blog.title}</ListGroup.Item>
            )}
        </ListGroup>
    )
}


export default Blogs
