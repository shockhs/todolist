import React, { useEffect, useState } from 'react'
import RouteGuard from '../RouteGuard'
import { connect } from 'react-redux'
import { getUserToken, getUserLogin } from '../../store/selectors'
import { callExit } from '../../store/actions'
import TodoProvider from '../../services/TodoProvider'
import CreateField from './CreateField'
import Spinner from '../Spinner'
import Header from '../Header/Header'
import TaskList from '../TaskList'
import './styles.scss'
import ListElements from './ListElements'
import { withRouter } from 'react-router-dom'

const TodoList = ({ userToken, callExit, userLogin, history }) => {
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
        if (todoTitle.trim().length) {
            TodoProvider.createTodo({ userToken, userLogin, todoTitle }).then((res) => {
                if (res.errors) {
                    setErrorStatus(true)
                } else {
                    setTodoList((prevList) => [...prevList, res])
                }
                setIsCreating(false)
            })
        } else {
            setErrorStatus(true)
            setIsCreating(false)
        }
    }

    const handleDelete = (event, id) => {
        event.preventDefault()
        setErrorStatus(false)
        setIsDeleting(true)
        TodoProvider.deleteTodo({ userToken, userLogin, todoId: id }).then((res) => {
            if (res) {
                setTodoList((prevList) => [...prevList.filter((item) => item._id !== id)])
                history.push('/')
            } else {
                setErrorStatus(true)
            }
            setIsDeleting(false)
        })
    }

    return (
        <div className="container">
            <Header callExit={callExit} />
            <div className="flex">
                <section id="todolist" className="todo">
                    <h2 style={{ textTransform: 'uppercase' }}>todo lists</h2>
                    <div className="listOfElements">
                        {todoList !== null ? (
                            <ListElements todoList={todoList} handleDelete={handleDelete} isDeleting={isDeleting} />
                        ) : (
                            <Spinner className="emptySpinner" />
                        )}
                        <CreateField handleCreate={handleCreate} isCreating={isCreating} />
                    </div>
                    {errorStatus ? (
                        <div className="errorField">
                            <span className="errorRequest">Что-то пошло не так</span>
                        </div>
                    ) : null}
                </section>
                <section className="todolistElements">
                    <RouteGuard path="/todo=:todoId" exact>
                        <TaskList userToken={userToken} />
                    </RouteGuard>
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

export default connect(mapStateToProps, { callExit })(withRouter(TodoList))
