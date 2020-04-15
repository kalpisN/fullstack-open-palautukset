import React from 'react'

const Find = (props) => {


    return (
        <div>
        find countries: <input value={props.filter}
                              onChange={props.onChange}
                        />
        </div>
    )
}

export default Find