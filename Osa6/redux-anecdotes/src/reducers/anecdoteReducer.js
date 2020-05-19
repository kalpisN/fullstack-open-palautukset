
/* const getId = () => (100000 * Math.random()).toFixed(0) */

/* const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
} */


export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'NEW',
    data: { content: anecdote.content, id: anecdote.id, votes: anecdote.votes }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
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
      return state.sort((a, b) => b.votes - a.votes)
  }
}

export default anecdoteReducer