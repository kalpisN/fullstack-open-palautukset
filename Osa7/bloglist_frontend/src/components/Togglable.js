import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Fab from '@material-ui/core/Fab'
import CloseIcon from '@material-ui/icons/Close';

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })


    return (
        <div className="togglable">
            <Fab aria-label="add" style={hideWhenVisible}
                onClick={toggleVisibility}>
                {props.buttonLabel}
            </Fab>
            <div style={showWhenVisible}>
                <Fab aria-label="close" style={showWhenVisible}
                    onClick={toggleVisibility}>
                    <CloseIcon />
                </Fab>
                {props.children}
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.object.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable
