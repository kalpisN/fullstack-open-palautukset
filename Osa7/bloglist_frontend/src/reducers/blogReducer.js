import blogService from '../services/blogs'

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs,
        })
    }
}

export const addBlog = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch({
            type: 'ADD_NEW',
            data: newBlog
        })
    }
}

export const updateBlog = (id, blogObject) => {
    return async dispatch => {
        const updatedBlog = await blogService
            .update(id, blogObject)
        dispatch({
            type: 'UPDATE',
            data: { blog: updatedBlog }
        })
    }
}

export const remove = (id) => {
    return async dispatch => {
        await blogService
            .remove(id)
        dispatch({
            type: 'REMOVE',
            data: { id: id }
        })
    }
}

const blogReducer = (state = [], action) => {

    switch (action.type) {

    case 'INIT_BLOGS':
        return action.data

    case 'ADD_NEW':
        return [...state, action.data]

    case 'UPDATE':
        return state.map(blog => blog.id !== action.data.blog.id ? blog : action.data.blog)

    case 'REMOVE':
        return state.filter(b => b.id !== action.data.id)

    default:
        return state
    }
}

export default blogReducer