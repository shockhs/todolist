import React, { useEffect, useState } from 'react'
import { Link, Route } from 'react-router-dom'

import { getUserToken, getUserLogin } from '../../store/selectors'
import { callExit } from '../../store/actions'
import TodoProvider from '../../services/TodoProvider'
import CreateField from './CreateField'
import Spinner from '../helpers/Spinner'
import Header from '../Header/Header'
import TaskList from '../TaskList'
import './styles.scss'
import { connect } from 'react-redux'

const TodoList = ({ userToken, callExit, userLogin }) => {
    const [todoList, setTodoList] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [errorStatus, setErrorStatus] = useState(false)

    useEffect(() => {
        TodoProvider.getTodos({ userToken, userLogin }).then((res) => setTodoList(res))
    }, [userToken, userLogin])

    const handleCreate = (todoTitle) => {
        setErrorStatus(false)
        setIsCreating(true)
        TodoProvider.createTodo({ userToken, userLogin, todoTitle }).then((res) => {
            if (res.errors) {
                setErrorStatus(true)
            } else {
                setTodoList((prevList) => [...prevList, res])
            }
            setIsCreating(false)
        })
    }

    const handleDelete = (event, id) => {
        event.preventDefault()
        setErrorStatus(false)
        setIsDeleting(true)
        TodoProvider.deleteTodo({ userToken, userLogin, todoId: id }).then((res) => {
            if (res) {
                setTodoList((prevList) => [...prevList.filter((item) => item._id !== id)])
            } else {
                setErrorStatus(true)
            }
            setIsDeleting(false)
        })
    }

    const renderedList = () =>
        todoList.map((item) => {
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

    return (
        <div className="container">
            <Header callExit={callExit} />
            <div className="flex">
                <section id="todolist" className="todo">
                    <h2 style={{ textTransform: 'uppercase' }}>todo lists</h2>
                    <div className="listOfElements">
                        {todoList !== null ? renderedList() : <Spinner className="emptySpinner" />}
                        <CreateField handleCreate={handleCreate} isCreating={isCreating} />
                    </div>
                    {errorStatus ? (
                        <div className="errorField">
                            <span className="errorRequest">Что-то пошло не так</span>
                        </div>
                    ) : null}
                </section>
                <section className="todolistElements">
                    <Route exact path="/todo=:todoId" render={() => <TaskList userToken={userToken} />} />
                </section>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userToken: getUserToken(state),
        userLogin: getUserLogin(state),
    }
}

export default connect(mapStateToProps, { callExit })(TodoList)
