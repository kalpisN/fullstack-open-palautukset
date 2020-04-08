import React from 'react'

const Course = ({course}) => {
    
    const Header = ({name}) => {
        console.log(name)
          return (
            <h1>{name}</h1>
          )
      }
    
      const Content = ({parts}) => {
        return(
          <div>
          {parts.map(part =>
            <Part key={part.id} part={part}/>     
        )
          }
        </div>
        )
      }
    
        const Total = ({parts}) => {
        const exercises = parts.map(part => part.exercises);
        console.log(exercises)
        const reducer = (acc, cur) => acc + cur;
        
        const sum = exercises.reduce(reducer);
                
        return(
        <>    
          <p>
            total of {sum} exercises        
          </p>     
        </>      
        )         
      }
    
      const Part = (props) => {
          return(
            <>
              <p>
              {props.part.name}  {props.part.exercises} 
              </p>
            </>
          )
      }


    
    return(  
        <div>         
            <Header name={course.name}/>      
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>               
        </div>
    )
}

export default Course