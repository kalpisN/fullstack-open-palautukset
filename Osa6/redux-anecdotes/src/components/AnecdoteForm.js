import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
            dispatch(addAnecdote(content))
            dispatch(setNotification(`You added '${content}'`, 5))

      }
    

      return (
          <div>
        <h2>create new</h2>
        <form onSubmit={addNew}>
          <div><input name="anecdote" /></div>
          <button>create</button>
        </form>
        </div>
      )
  
}

export default AnecdoteForm