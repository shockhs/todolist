import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import React from 'react'

const ListElements = ({ taskList, isDeleting, handleDelete }) => {
    return taskList.map((item) => {
        return (
            <div key={item._id} className="taskList-item">
                <div className="taskList-item-task">{item.task}</div>
                {!isDeleting ? (
                    <Link to="/" className="todoList-elements-delete" onClick={(event) => handleDelete(event, item._id)}>
                        Delete
                    </Link>
                ) : null}
            </div>
        )
    })
}

ListElements.propTypes = {
    todoList: PropTypes.array,
    isDeleting: PropTypes.bool,
    handleDelete: PropTypes.func,
}

export default ListElements
