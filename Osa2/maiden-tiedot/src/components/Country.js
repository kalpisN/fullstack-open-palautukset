import React from 'react'
import Weather from './Weather'


const Country = ( props ) => {

    if (props.filtered.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }

    else if (props.filtered.length <= 10 && props.filtered.length > 1) {
    
    return (
    props.filtered.map((country) =>
        <p key={country.name}>
            {country.name}
            <button onClick={props.onClick} key={country.name} value={country.name}>show</button>
        </p>       
    )
    )
    }

    else {
        
        return (          
            props.filtered.map((country) =>
            <div key={country.name}>
            <h1>{country.name}</h1>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <div>
            <h2>Spoken languages</h2>
            <ul>
            {country.languages.map((language =>
            <li key={language.name}>{language.name}</li>
            ))}
            </ul>
            </div>
            <img width={150} alt="flag" src={country.flag}></img>
            <Weather capital={country.capital} />
            </div>
        )   
        )
    }
}

export default Country