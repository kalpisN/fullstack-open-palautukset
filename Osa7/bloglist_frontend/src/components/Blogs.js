import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'

const Blogs = (props) => {



    return (
        <div id='blogs'>
            {props.blogs.map(blog =>
                <Blog key={blog.id} blog={blog} user={props.user} />
            )}

        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        notification: state.notification
    }
}

const ConnectedBlogs = connect(mapStateToProps)(Blogs)
export default ConnectedBlogs