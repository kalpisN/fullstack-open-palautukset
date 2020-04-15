import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capital}) => {

    const [weather, setWeather] = useState([]);
    
    const key=process.env.REACT_APP_API_KEY
    
        useEffect(() => {     
        axios
            .get(`http://api.weatherstack.com/current?access_key=${key}&query=${capital}`)
            .then(response => {
                console.log(response.data)
                setWeather(response.data.current)
                              
            }).catch(error => {
                console.log(error)

            })
        }, [])

        return (
            <div>
                <h2>Weather in {capital}</h2>
                <p><b>temperature:</b> {weather.temperature} Celcius</p>
            
                <img width={100} alt="weathericon" src={weather.weather_icons}></img>
                <p><b>wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    

            </div>
        )     
    }

export default Weather