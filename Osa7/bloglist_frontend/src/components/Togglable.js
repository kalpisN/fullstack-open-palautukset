import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

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
            <Fab className="addButton" aria-label="add" style={hideWhenVisible} size="small"
                onClick={toggleVisibility} color="light">
                <AddIcon />
            </Fab>
            <div style={showWhenVisible}>
                {props.children}
                <Button size="sm" variant="outline-dark" onClick={toggleVisibility}>cancel</Button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}
Togglable.displayName = 'Togglable'
export default Togglable
