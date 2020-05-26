import blogService from '../services/blogs'

export const addNew = (commentObject) => {
    return async dispatch => {
        const newComment = await blogService.createComment(commentObject)
        dispatch({
            type: 'ADD_COMMENT',
            data: newComment
        })
    }
}

export const fetchComments = (id) => {
    return async dispatch => {
        const comments = await blogService.getComments(id)
        dispatch({
            type: 'GET',
            data: comments
        })
    }
}

const blogReducer = (state = [], action) => {

    switch (action.type) {

    case 'GET':
        return action.data
    case 'ADD_COMMENT':
        return state.map(blog => blog.id !== action.data.blog.id ? blog : action.data)

    default:
        return state
    }
}

export default blogReducer