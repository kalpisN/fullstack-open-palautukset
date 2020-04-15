import React, { useState, useEffect } from 'react'
import './App.css';
import axios from 'axios'
import Find from './components/Find'
import Country from './components/Country'


function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    console.log('effect')
    
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')
  /* countries.map((country) => console.log(country.name)) */

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const filtered = countries.filter(country =>
    country.name.toUpperCase().includes(filter.trim().toUpperCase()))

  const handleClick = (event) => {
    event.preventDefault();
    setFilter(event.target.value)
  }

  return (
    <div>
      <Find onChange={handleFilterChange} value={filter} />
      <Country onClick={handleClick} filtered={filtered}/>
    </div>
  );
}

export default App;
