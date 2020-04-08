import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Anecdote = (props) => {
  return(
  <div>
  <h1>Anecdote of the day</h1>
  <p>{props.anecdote}</p>
  <p>has {props.votes} votes</p>
  </div>)
}

const MostVoted = (props) => {
  const max = Math.max(...props.votes)
  console.log(max);
  const best = (props.votes.indexOf(max))
  

  return(
    <div>
    <h1>Anecdote with most votes</h1>
    <p>{props.anecdotes[best]}</p>
    <p>has {props.votes[best]} votes</p>
    </div>
  )  
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>

)



const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(6))

  const getRandomNumber = (max) => {

    return Math.floor(Math.random() * Math.floor(max));
  
  }

  const handleRandomClick = () => {
    const random = getRandomNumber(6);
    setSelected(random);

  }

  const handleVoteClick = () => {
    const copy = [ ...votes ]
    copy[selected] += 1
    setVotes(copy);
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button onClick={handleVoteClick} text="vote"/>
      <Button onClick={handleRandomClick} text="next anecdote"/>
      <MostVoted votes={votes} anecdotes={anecdotes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
