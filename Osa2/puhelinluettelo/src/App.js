import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './service/persons'
import Notification from './components/Notification'

const App = () => {

  const [filter, setFilter] = useState('');
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [message, setMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('err')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
        console.log(initialPersons)
      })
  }, [])

  const notificationShow = (msg, err) => {
    if (err) {
      setNotificationType('err')
    }
    else {
      setNotificationType('success')
    }
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const addName = event => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    }
    
    const names = persons.map(person => person.name)
    if (!names.includes(personObject.name)) {

      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          notificationShow(`${returnedPerson.name} was added to phonebook!`, false)
        })
        .catch(error => {
          console.log(error.response.data)
          notificationShow(error.response.data.error, true)
        
        })

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
            notificationShow(`${returnedPerson.name} was updated succesfully!`, false)
          })
          .catch(error => {
            notificationShow(`${newName} does not exist in the server!`, true)
            setPersons(persons.filter(person => person.name !== newName))
          })
      }
    }
    setNewName('')
    setNewNumber('')
  }

  const handleDelete = (person) => {
    console.log(person.id);
    if (window.confirm(`Do you really want tot delete ${person.name}?`)) {

      personService
        .del(person.id)
        .then(data => {
          setPersons(persons.filter(p => p.id !== person.id))
          notificationShow(`${person.name} deleted from phonebook`, false)
        })
        .catch(error => {
          notificationShow(`${person.name} does not exist in the phonebook anymore!`, true)
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
      <Notification message={message} className={notificationType}/>
      <Filter value={filter}
        onChange={handleFilterChange} />
      <h3>Add a new number</h3>
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
