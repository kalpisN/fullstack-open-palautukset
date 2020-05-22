import React from 'react'
import './Notification.css'
/* import PropTypes from 'prop-types' */
import { connect } from 'react-redux'

const Notification = (props) => {
    return (
        <>
            {props.notification.message === null ? null :


                <div className={props.notification.className}>
                    {props.notification.message}
                </div>

            }
        </>
    )
}

/* Notification.propTypes = {
    className: PropTypes.string.isRequired
} */

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification