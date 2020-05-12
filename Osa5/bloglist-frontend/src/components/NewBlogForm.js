import React, { useState } from 'react'

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
            <form onSubmit={addNote}>
                <div>
                    title:
            <input
                        type="text"
                        value={newTitle}
                        name="title"
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
            <input
                        type="text"
                        value={newAuthor}
                        name="title"
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
            <input
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

export default NewBlogForm