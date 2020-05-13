import React from 'react'
import './Notification.css'
import PropTypes from 'prop-types'

const Notification = (props) => {
    return (
        <>
            {props.message === null ? null :


                <div className={props.className}>
                    {props.message}
                </div>

            }
        </>
    )
}

Notification.propTypes = {
    className: PropTypes.string.isRequired
}
export default Notification