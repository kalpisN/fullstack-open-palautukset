import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './service/persons'

const App = () => {

  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log(initialPersons)
      })
  }, [])


  console.log('render', persons.length, 'persons')

  const personAlreadyExists = (name) => {
    return persons.some(y => y.name === name)
  }

  const addName = event => {
    event.preventDefault();
    if (!personAlreadyExists(newName, newNumber)) {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          console.log(`${returnedPerson.name} was added to phonebook!`)
        })
      setNewName('');
      setNewNumber('');

    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const id = persons.find(p => p.name === newName).id
        const personObject = {
          name: newName,
          number: newNumber
        }
        personService
          .update(id, personObject)
          .then(returnedPerson => {
            setPersons(
              persons.map(person => person.id === id ? returnedPerson : person)
            )
            console.log(`${returnedPerson.name} was updated!`)
          })
          .catch(error => {
            alert(`${newName} does not exist in the server!`)
            setPersons(persons.filter(person => person.name !== newName))
          })
      }

    }
  }

  const handleDelete = (person) => {
    console.log(person.id);
    if (window.confirm(`Do you really want tot delete ${person.name}?`)) {

      personService
        .del(person.id)
        .then(data => {
          console.log(person, 'deleted from phonebook')
          setPersons(persons.filter(p => p.id !== person.id))
        })
        .catch(error => {
          alert(
            `${person.name} was already deleted from server`)
          setPersons(persons.filter(p => p.id !== person.id))

        })
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filtered =
    persons.filter(person =>
      person.name.toUpperCase().includes(filter.trim().toUpperCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter}
        onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addName}
        onNameChange={handleNameChange}
        nameValue={newName}
        onNumberChange={handleNumberChange}
        numberValue={newNumber} />
      <h3>Numbers</h3>
      <Person filtered={filtered} handleDelete={handleDelete} />
    </div>
  )

}

export default App
