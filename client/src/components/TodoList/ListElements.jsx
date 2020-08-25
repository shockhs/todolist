import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ListElements = ({ todoList, isDeleting, handleDelete }) => {
    return todoList.map((item) => {
        return (
            <div key={item._id} className="todoList-elements">
                <Link to={`/todo=${item._id}`} className="todoList-elements-item">
                    {item.title}
                </Link>
                {!isDeleting ? (
                    <a
                        className="todoList-elements-delete"
                        href="/"
                        disabled={isDeleting}
                        onClick={(event) => handleDelete(event, item._id)}
                    >
                        Delete
                    </a>
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
