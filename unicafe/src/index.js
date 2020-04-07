import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.allClicks === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  else {

    return (
      <div>
        <h1>Statistics:</h1>
        <table>
          <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.all} />
        <StatisticLine text="average" value={props.average} />
        <StatisticLine text="positive" value={props.positive} />
        </tbody>
        </table>
      </div>)
  }

}
const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (<tr><td>{props.text}:</td><td>{props.value} %</td></tr>)
  }
  else {
    return (
      <tr><td>{props.text}:</td><td>{props.value}</td></tr>)
  }
}
const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)
  const [positive, setPositive] = useState(0)
  const [average, setAverage] = useState(0)

  const handleGoodClick = () => {
    setAll(allClicks + 1)
    setGood(good + 1)
    setAverage((good - bad) / allClicks);
    setPositive(good / allClicks * 100);
  }

  const handleNeutralClick = () => {
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
    setAverage((good - bad) / allClicks);
  }

  const handleBadClick = () => {
    setAll(allClicks + 1)
    setBad(bad + 1)
    setAverage((good - bad) / allClicks);

  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <br />
      <Statistics good={good} neutral={neutral} bad={bad}
        average={average} positive={positive} all={allClicks} />

    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
