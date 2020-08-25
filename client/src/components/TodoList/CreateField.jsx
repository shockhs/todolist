import React, { useState, useEffect } from 'react'
import Spinner from '../helpers/Spinner'
import PropTypes from 'prop-types'

const CreateField = ({ handleCreate, isCreating }) => {
    const [todoTitle, setTodoTitle] = useState('')

    useEffect(() => {
        if (!isCreating) setTodoTitle('')
    }, [isCreating])

    const handleCreateClick = (e) => {
        e.preventDefault()
        handleCreate(todoTitle)
    }

    const handleResetClick = (e) => {
        e.preventDefault()
        setTodoTitle('')
    }

    return (
        <>
            <input
                className="input-todo"
                value={todoTitle}
                placeholder="New TODO name..."
                onChange={(e) => {
                    setTodoTitle(e.target.value)
                }}
                type="text"
            />
            <div className="button-block-fixed">
                {isCreating ? (
                    <Spinner className="spinner" />
                ) : (
                    <a href="/" onClick={handleCreateClick}>
                        Create
                    </a>
                )}
                <a href="/" onClick={handleResetClick}>
                    Reset
                </a>
            </div>
        </>
    )
}

CreateField.propTypes = {
    handleCreate: PropTypes.func,
    isCreating: PropTypes.bool,
}

export default CreateField
