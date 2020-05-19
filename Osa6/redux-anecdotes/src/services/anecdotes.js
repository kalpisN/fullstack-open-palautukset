import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async content => {
  const anecdoteObject = {
    content: content,
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdoteObject)
  return response.data
}

const update = async (anecdote) => {
  const newAnecdote = {
    content: anecdote.content,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, newAnecdote)
  return response.data
}
export default { getAll, create, update }