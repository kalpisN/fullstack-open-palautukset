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

        const newAnecdote = await anecdoteService.create(content)
        console.log(newAnecdote)
            dispatch(addAnecdote(newAnecdote))
            dispatch(setNotification(`You added '${newAnecdote.content}'`))
            setTimeout(() => {
                dispatch(setNotification(null))
            }, 5000)

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