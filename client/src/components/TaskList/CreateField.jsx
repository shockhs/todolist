import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import Spinner from '../Spinner'

const CreateField = ({ isCreating, handleCreate }) => {
    const [task, setTask] = useState('')

    useEffect(() => {
        if (!isCreating) setTask('')
    }, [isCreating])

    const handleCreateClick = (e) => {
        e.preventDefault()
        handleCreate(task)
    }

    const handleResetClick = (e) => {
        e.preventDefault()
        setTask('')
    }

    return (
        <div className="taskList-create">
            <input
                className="taskList-create-input"
                value={task}
                onChange={(e) => {
                    setTask(e.target.value)
                }}
                placeholder="Task message..."
                type="text"
            />
            {isCreating ? (
                <Spinner className="spinner" />
            ) : (
                <a href="/" onClick={handleCreateClick}>
                    Add task
                </a>
            )}
            <a href="/" onClick={handleResetClick}>
                Reset
            </a>
        </div>
    )
}

CreateField.propTypes = {
    handleCreate: PropTypes.func,
    isCreating: PropTypes.bool,
}

export default CreateField
