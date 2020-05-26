import React, { useEffect } from 'react'
import { useField } from '../hooks/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, addNew } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'


const Comments = ({ id }) => {

    const comment = useField('text')
    const comments = useSelector(state => state.comments)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchComments(id))
    }, [dispatch, id])


    const addComment = async (event) => {
        event.preventDefault()

        const commentObject = {
            content: comment.value,
            blog: id
        }
        await dispatch(addNew(commentObject))
            .then(addedComment => dispatch(setNotification('new comment added succesfully!', 'success')))
            .catch(error => dispatch(setNotification('Oops, something went wrong and the comment may not have been added!', 'error')))
        dispatch(fetchComments(id))
        comment.onSubmit()

    }
    if (!id) {
        return null
    }

    return (
        <div>
            <h3>comments</h3>
            <form onSubmit={addComment}>
                <div>
                    <input {...comment} /><button type="submit">add comment</button>
                </div>
            </form>
            <div>
                {comments.map(c =>
                    <li key={c.id}>{c.content}</li>)}
            </div>
        </div>

    )
}

export default Comments