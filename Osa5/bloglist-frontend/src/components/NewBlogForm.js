import React, { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ createBlog }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) => {
        console.log(event.target.value)
        setNewTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        console.log(event.target.value)
        setNewAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setNewUrl(event.target.value)
    }

    const addNote = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl
        })

        setNewTitle('')
        setNewUrl('')
        setNewAuthor('')
    }
    return (
        <>
            <h2>Create new</h2>
            <form id='form' onSubmit={addNote}>
                <div>
                    title:
                    <input
                        id="title"
                        type="text"
                        value={newTitle}
                        name="title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='author'
                        type="text"
                        value={newAuthor}
                        name="author"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id="url"
                        type="text"
                        value={newUrl}
                        name="url"
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )

}

NewBlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired,
}

export default NewBlogForm