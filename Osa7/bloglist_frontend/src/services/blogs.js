import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (blogId, blogObject) => {
    const request = axios.put(`${baseUrl}/${blogId}`, blogObject)
    return request.then(response => response.data)
}

const remove = async (blogId) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${blogId}`, config)
    return response
}
const getComments = async (blogId) => {
    const request = axios.get(`${baseUrl}/${blogId}/comments`)

    return request.then(response => response.data.comments)
}
const createComment = async (commentObject) => {

    const response = await axios.post(`${baseUrl}/${commentObject.blog}/comments`, commentObject)
    return response.data
}
export default { getAll, token, setToken, create, update, remove, createComment, getComments }