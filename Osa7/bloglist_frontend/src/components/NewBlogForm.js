import React from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { useField } from '../hooks'
import { loggedUser } from '../reducers/loginReducer'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

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
            .catch(error => dispatch(setNotification(error.message, 'error')))

        title.onSubmit()
        author.onSubmit()
        url.onSubmit()

    }

    return (
        <div className="addBlog">
            <Togglable ref={myRef} buttonLabel='new blog'>
                <h2 className="header" >Create new</h2>
                <Form id='form' onSubmit={createBlog}>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text className="inputLabel">Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="title"
                            {...title}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text className="inputLabel">Author</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="author"
                            {...author}
                        />
                    </InputGroup>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text className="inputLabel">Url</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                            placeholder="https://example.com"
                            {...author}
                        />
                    </InputGroup>
                    <Button className="button"type="submit" size="sm" variant="outline-dark">create</Button>
                </Form>
            </Togglable>
        </div>
    )

}

export default NewBlogForm

