import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import TodoProvider from '../../services/TodoProvider'
import CreateField from './CreateField'
import Spinner from '../helpers/Spinner'
import './styles.scss'

const TaskList = ({ userToken, ...props }) => {
    const todoId = props.match.params.todoId
    const [taskList, setTaskList] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)

    useEffect(() => {
        TodoProvider.getTasks({ todoId, userToken }).then((res) => setTaskList(res))
    }, [todoId, userToken])

    const handleCreate = (task) => {
        setErrorStatus(false)
        setIsCreating(true)
        TodoProvider.createTask({ todoId, userToken, task }).then((res) => {
            if (res.errors) {
                setErrorStatus(true)
            } else {
                setTaskList((prevList) => [...prevList, res])
            }
            setIsCreating(false)
        })
    }

    const handleDelete = (event, taskId) => {
        event.preventDefault()
        setErrorStatus(false)
        setIsDeleting(true)
        TodoProvider.deleteTask({ todoId, userToken, taskId }).then((res) => {
            if (res) {
                setTaskList((prevList) => [...prevList.filter((item) => item._id !== taskId)])
            } else {
                setErrorStatus(true)
            }
            setIsDeleting(false)
        })
    }

    const renderedList = () =>
        taskList.map((item) => {
            return (
                <div key={item._id} className="taskList-item">
                    <div className="taskList-item-task">{item.task}</div>
                    {!isDeleting ? (
                        <Link
                            to="/"
                            className="todoList-elements-delete"
                            disabled={isDeleting}
                            onClick={(event) => handleDelete(event, item._id)}
                        >
                            Delete
                        </Link>
                    ) : null}
                </div>
            )
        })

    return (
        <div className="taskList">
            <h2>Tasks in the selected list</h2>
            <div className="taskList-elements">{taskList !== null ? renderedList() : <Spinner className="emptySpinner" />}</div>
            <CreateField handleCreate={handleCreate} isCreating={isCreating} />
            {errorStatus ? (
                <div className="errorField">
                    <span className="errorRequest">Что-то пошло не так</span>
                </div>
            ) : null}
        </div>
    )
}

export default withRouter(TaskList)
