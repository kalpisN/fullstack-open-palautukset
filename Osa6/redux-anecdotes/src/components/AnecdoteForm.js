import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
   
    const addNew = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
            props.addAnecdote(content)
            props.setNotification(`You added '${content}'`, 5)

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
const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = {
  addAnecdote,
  setNotification
}

const ConnectedAnecdote = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteForm)

export default ConnectedAnecdote