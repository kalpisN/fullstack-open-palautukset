import React from 'react'

const NewBlogForm = (props) => {
    return(
    <>
    <h2>Create new</h2>
    <form onSubmit={props.onSubmit}>
        <div>
            title: 
            <input
            type="text"
            value={props.title}
            name="title"
            onChange={props.onTitleChange}
            />
        </div>
        <div>
            author: 
            <input
            type="text"
            value={props.author}
            name="title"
            onChange={props.onAuthorChange}
            />
        </div>
        <div>
            url: 
            <input
            type="text"
            value={props.url}
            name="url"
            onChange={props.onUrlChange}
            />
        </div>
        <button type="submit">create</button>
    </form>
    </>
    )

}

export default NewBlogForm