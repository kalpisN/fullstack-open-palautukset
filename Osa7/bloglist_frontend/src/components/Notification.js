import React from 'react'
import { useSelector } from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {

    const notification = useSelector(state => state.notification)

    return (
        <>
            {notification.message === null ? null :
                <Alert variant={notification.messageType}>
                    {notification.message}
                </Alert>
            }
        </>
    )
}

export default Notification