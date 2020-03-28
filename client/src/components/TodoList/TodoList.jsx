import React from 'react'
import './TodoList.css'
import { useState } from 'react'
import { Route, NavLink, withRouter, Switch, Link } from "react-router-dom";
import { useEffect } from 'react';
import TaskList from '../TaskList/TaskList';
import Header from '../Header/Header';
import Spinner from '../../img/spinner.svg'


const TodoList = ({ userToken, callExit, userLogin, ...props }) => {
    if (props.history.location.pathname==="/login") {
        props.history.push('/');
    }
    let array = props.history.location.pathname.split('=')
    let currentArray;
    const [todoList, setTodoList] = useState(null);
    const [statusCreate, setStatusCreate] = useState(false);
    const [updateState, setUpdateState] = useState(true);
    const [todoId, setTodoId] = useState(null);
    const [statusRequest, setStatusRequest] = useState(false);
    const [rendered, setRendered] = useState(false)
    const [forceCreate, setForceCreate] = useState(false);
    const [todo, setTodo] = useState('');
    useEffect(() => { //  GET TODOLIST STATE
        const options = {
            method: 'GET',
            headers: {
                'auth-token': `${userToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const fetchTodo = async () => {
            await fetch(`https://react-todolist-application.herokuapp.com/api/todo/userLogin=${userLogin}`, options)
                .then(res => res.json())
                .then(res =>
                    setTodoList(res)
                )
        }
        fetchTodo();
    }, [userToken, userLogin, updateState])
    useEffect(() => { // ADD TODO
        const options = {
            method: 'POST',
            headers: {
                'auth-token': `${userToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ userLogin: userLogin, title: todo })
        };
        const fetchTodo = async () => {
            await fetch(`https://react-todolist-application.herokuapp.com/api/todo`, options)
                .then(res => res.json())
                .then(
                    setTimeout(() => {
                        setStatusCreate(false);
                        setTodo('');
                        setUpdateState(updateState => !updateState)
                    }, 3000),
                )
        }
        if (rendered) {
            if (todo !== '') {
                fetchTodo()
            } else {
                alert('Поле пустое')
                setStatusCreate(false);
            }
        }
        return () => {
            // clean
        };// eslint-disable-next-line 
    }, [forceCreate]);
    useEffect(() => { // DELETE TODO
        const options = {
            method: 'DELETE',
            headers: {
                'auth-token': `${userToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ todoId: todoId })
        };
        const fetchTodo = async () => {
            await fetch(`https://react-todolist-application.herokuapp.com/api/todo`, options)
                .then(res => res.json())
                .then(
                    setTimeout(() => {
                        setStatusRequest(false)
                        setUpdateState(updateState => !updateState)
                        setTodoList(null);
                        if (array[1] === todoId) {
                            props.history.push('/');
                        }
                    }, 3000),
                )
        }
        if (rendered) fetchTodo();
        return () => {
            // clean
        };// eslint-disable-next-line 
    }, [todoId]);
    const handleCreate = () => {
        setStatusCreate(true); // DISABLE/ENABLE BUTTON FOR DELETE 
        setRendered(true); // ACTIVATE FETCH FOR DELETE TASK ID
        setForceCreate(forceCreate => !forceCreate); // TASK ID WHAT WILL BE DELETED
    }
    const handleDelete = (id) => {
        setStatusRequest(true); // DISABLE/ENABLE BUTTON FOR DELETE 
        setRendered(true); // ACTIVATE FETCH FOR DELETE TASK ID
        setTodoId(id); // TASK ID WHAT WILL BE DELETED
    }
    if (todoList === null) {
        currentArray = <h1>Loading...</h1>
    } else {
        currentArray = todoList.map(item => {
            return (
                <div key={item._id} className="todoList-elements">
                    <NavLink to={`/todo=${item._id}`} className="todoList-elements-item">{item.title}</NavLink>
                    {!statusRequest
                        ? <Link className="todoList-elements-delete" to="/" disabled={statusRequest}
                            onClick={(event) => { event.preventDefault(); handleDelete(item._id) }}>
                            Delete </Link>
                        : null}
                </div>
            )
        })
    }
    return (
        <div className="container">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <Header callExit={callExit}/>
            <div className="flex">
                <section id="todolist" className="todo">
                    <h2>CREATED TODOs</h2>
                    <div className="listOfElements">
                        {currentArray}
                        <input className="input-todo" value={todo} placeholder="New TODO name..." onChange={(e) => { setTodo(e.target.value) }} type="text" />
                        <div className="button-block">
                            {statusCreate
                                ? <img className="spinner" src={Spinner} alt='spinner' />
                                : <Link to="/" onClick={(event) => { event.preventDefault(); if (!statusCreate) handleCreate() }}>
                                    Create<span></span><span></span><span></span><span></span>
                                </Link>}
                            <Link to="/" onClick={(event) => { event.preventDefault(); setTodo('') }}>
                                Reset
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </Link>
                        </div>
                    </div>
                </section>
                <section className="todolistElements">
                    <Switch>
                        <Route exact path='/' render={() => { return null }} />
                        <Route exact path='/todo=:todoId' render={() => <TaskList userToken={userToken} />} />
                    </Switch>
                </section>
            </div>
        </div >
    )
}
export default withRouter(TodoList)