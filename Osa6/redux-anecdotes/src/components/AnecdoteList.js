import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  
  const vote = (anecdote) => {
    props.addVote(anecdote)
    props.setNotification(`You voted '${anecdote.content}'`, 5)
  }

  return(
      <div>
        
    {props.anecdotes.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
                .sort((a, b) => b.votes - a.votes)
                .filter(anecdote => anecdote.content
                        .toLowerCase().includes(state.filter
                          .toLowerCase().trim())),
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdotes