import React, { useEffect } from 'react'
import { useField } from '../hooks/index'
import { useDispatch, useSelector } from 'react-redux'
import { fetchComments, addNew } from '../reducers/commentReducer'
import { setNotification } from '../reducers/notificationReducer'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'


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
            .catch(error => dispatch(setNotification('Oops, something went wrong and the comment may not have been added!', 'danger')))
        dispatch(fetchComments(id))
        comment.onSubmit()

    }
    if (!id) {
        return null
    }

    return (
        <div>
            <h3 className="header2">Comments</h3>
            <form onSubmit={addComment}>
                <div>
                    <input className="commentinput" {...comment} /><Button className="commentButton" size="sm" variant="outline-dark" type="submit">add comment</Button>
                </div>
            </form>
            <ListGroup className="comments">
                {comments.map(c =>
                    <ListGroup.Item variant="light" key={c.id}>{c.content}</ListGroup.Item>)}
            </ListGroup>
        </div>

    )
}

export default Comments

