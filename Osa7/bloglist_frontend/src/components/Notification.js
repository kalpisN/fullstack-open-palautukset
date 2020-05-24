import React from 'react'
import './Notification.css'
import { connect } from 'react-redux'

const Notification = (props) => {
    return (
        <>
            {props.notification.message === null ? null :
                <div className={props.notification.messageType}>
                    {props.notification.message}
                </div>

            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification