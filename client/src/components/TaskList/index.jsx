import './styles.scss'

import React, { useEffect, useState } from 'react'

import CreateField from './CreateField'
import ListElements from './ListElements'
import Spinner from '../Spinner'
import TodoProvider from '../../services/TodoProvider'
import { withRouter } from 'react-router-dom'

const TaskList = ({ userToken, ...props }) => {
    const todoId = props.match.params.todoId
    const [taskList, setTaskList] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)

    useEffect(() => {
        setIsCreating(false)
        setIsDeleting(false)
        setErrorStatus(false)
        TodoProvider.getTasks({ todoId, userToken }).then((res) => setTaskList(res))
    }, [todoId, userToken])

    const handleCreate = (task) => {
        setErrorStatus(false)
        setIsCreating(true)
        if (task.trim().length) {
            TodoProvider.createTask({ todoId, userToken, task }).then((res) => {
                if (res.errors) {
                    setErrorStatus(true)
                } else {
                    setTaskList((prevList) => [...prevList, res])
                }
                setIsCreating(false)
            })
        } else {
            setErrorStatus(true)
            setIsCreating(false)
        }
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

    return (
        <div className="taskList">
            <h2>Tasks in the selected list</h2>
            <div className="taskList-elements">
                {taskList !== null ? (
                    <ListElements handleDelete={handleDelete} isDeleting={isDeleting} taskList={taskList} />
                ) : (
                    <Spinner className="emptySpinner" />
                )}
            </div>
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
