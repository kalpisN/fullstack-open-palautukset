import React from 'react'
import './Notification.css'

const Notification = (props) => {
    return (
        <>
            { props.message === null ? null :


                <div className={props.className}>
                    {props.message}
                </div>

            }
        </>
    )
}

export default Notification