import anecdoteService from '../services/anecdotes'
/* const getId = () => (100000 * Math.random()).toFixed(0) */

/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} */


export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote)
    dispatch({
    type: 'VOTE',
    data: { id: updatedAnecdote.id }
  })
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
    type: 'NEW',
    data: { content: newAnecdote.content, id: newAnecdote.id, votes: newAnecdote.votes }
    })
  }
}

export const initializeAnecdotes = () => {
  return  async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
    })
  }
}

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : votedAnecdote)

      case 'NEW':
        return [...state, action.data ]

      case 'INIT_ANECDOTES':
        return action.data

    default:
      return state
  }
}

export default anecdoteReducer