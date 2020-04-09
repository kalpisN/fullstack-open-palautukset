import React, { useState } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {
  
  const [ filter, setFilter ] = useState('');

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
])

const [newName, setNewName] = useState('');
const [newNumber, setNewNumber] = useState('');

const addName = (event) => {
    event.preventDefault();

    const personObject = {
        name: newName,
        number: newNumber
    }

    const names = persons.map(person => person.name)
    console.log(names)
    if (names.includes(personObject.name)) {

        alert(`${newName} is already added to phonebook`)
        setNewName('');
        setNewNumber('');
    }
    else {
        setPersons(persons.concat(personObject))
        setNewName('');
        setNewNumber('');
    }

}

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
      }
    
      const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
      }

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const filtered = persons.filter(person => 
                  person.name.toUpperCase().includes(filter.trim().toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter}
              onChange={handleFilterChange}/>
      <h3>Add a new</h3>
        <PersonForm onSubmit={addName}
                    onNameChange={handleNameChange}
                    nameValue={newName}
                    onNumberChange={handleNumberChange}
                    numberValue={newNumber}/>
      <h3>Numbers</h3>      
          <Person filtered={filtered} />
    </div>
  )

}

export default App
