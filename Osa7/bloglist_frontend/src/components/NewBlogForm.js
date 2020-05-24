import React from 'react'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { useField } from '../hooks'

const NewBlogForm = (props) => {

    const myRef = React.createRef()

    const title = useField('text')
    const author = useField('text')
    const url = useField('text')

    const createBlog = async (event) => {
        event.preventDefault()

        myRef.current.toggleVisibility()

        const blogObject = {
            title: title.value,
            author: author.value,
            url: url.value
        }

        await props.addBlog(blogObject)
            .then(createdBlog => props.setNotification(`a new blog ${blogObject.title} by ${blogObject.author} was added to bloglist!`, 'success'))
            .catch(error => props.setNotification(error.message, 'err'))
    }

    return (
        <>
            <Togglable ref={myRef} buttonLabel='new blog'>
                <h2>Create new</h2>
                <form id='form' onSubmit={createBlog}>
                    <div>
                        title:
                        <input {...title} />
                    </div>
                    <div>
                        author:
                        <input {...author} />
                    </div>
                    <div>
                        url:
                        <input {...url} />
                    </div>
                    <button type="submit">create</button>
                </form>
            </Togglable>
        </>
    )

}

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs,
        notification: state.notification
    }
}

const mapDispatchToProps = {
    addBlog,
    setNotification
}

const ConnectedNewBlogForm = connect(mapStateToProps, mapDispatchToProps)(NewBlogForm)
export default ConnectedNewBlogForm