import React from 'react'

const Person = ({ filtered, handleDelete }) => {

    return (

    filtered.map((person) =>
        <p key={person.name}>
            {person.name}: {person.number}
        <button onClick={() => handleDelete(person)}>Delete</button>
        </p>
    )
    )
}

export default Person