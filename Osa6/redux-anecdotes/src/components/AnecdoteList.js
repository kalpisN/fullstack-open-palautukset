import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {

  const anecdotes = useSelector(({anecdotes, filter}) => {
      return(anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase().trim())))
  })
 
  
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`))
    setTimeout(() => {
        dispatch(setNotification(null))
    }, 5000)
  }

  return(
      <div>
        
    {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
  )
  
}
export default AnecdoteList