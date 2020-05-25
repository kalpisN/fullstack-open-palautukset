import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { loggedUser } from '../reducers/loginReducer'

const NewBlogForm = (props) => {
    const dispatch = useDispatch()

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

        dispatch(addBlog(blogObject))
            .then(createdBlog => {
                dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} was added to bloglist!`, 'success'))
                dispatch(loggedUser())
            })
            .catch(error => dispatch(setNotification(error.message, 'err')))
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

export default NewBlogForm