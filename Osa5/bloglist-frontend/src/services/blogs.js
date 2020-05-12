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
  console.log(response.config.data)
  return response.config.data
}

const update = async updatedObject => {
  console.log(updatedObject)

  const params = {
    id: updatedObject.id
  }
  const body = {
    likes: updatedObject.likes
  }
  const response = await axios.put(baseUrl, params, body)
  console.log(response)
  return response
}
export default { getAll, token, setToken, create, update }