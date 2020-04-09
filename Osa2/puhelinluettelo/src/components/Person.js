import React from 'react'

const Person = ({ filtered }) => {

    return (

    filtered.map((person) =>
        <p key={person.name}>{person.name}: {person.number}</p>
    )

    )
}
export default Person