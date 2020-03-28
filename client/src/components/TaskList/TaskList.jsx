import React, { useEffect, useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './TaskList.css'
import Spinner from '../../img/spinner.svg'


const TaskList = (props) => {
    let currentArray;
    let path = props.match.params.todoId;
    const [rendered, setRendered] = useState(false)
    const [taskList, setTaskList] = useState(null);
    const [taskId, setTaskId] = useState(null);
    const [task, setTask] = useState('');
    const [statusRequest, setStatusRequest] = useState(false);
    const [statusCreate, setStatusCreate] = useState(false);
    const [forceCreate, setForceCreate] = useState(false);
    const [updateState, setUpdateState] = useState(true);
    useEffect(() => { // REFRESH TASK STATE
        const options = {
            method: 'GET',
            headers: {
                'auth-token': `${props.userToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };
        const fetchTodo = async () => {
            await fetch(`https://react-todolist-application.herokuapp.com/api/todo/task=${path}`, options)
                .then(res => res.json())
                .then(res => setTaskList(res))
        }
        fetchTodo();
        return () => {
            // clean
        };// eslint-disable-next-line 
    }, [updateState, path]);
    useEffect(() => { // DELETE TASK
        const options = {
            method: 'DELETE',
            headers: {
                'auth-token': `${props.userToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ todoId: path, taskId: taskId })
        };
        const fetchTodo = async () => {
            await fetch(`https://react-todolist-application.herokuapp.com/api/todo/task`, options)
                .then(res => res.json())
                .then(
                    setTimeout(() => {
                        setStatusRequest(false)
                        setUpdateState(updateState => !updateState)
                    }, 3000),
                )
        }
        if (rendered) fetchTodo();
        return () => {
            // clean
        };// eslint-disable-next-line 
    }, [taskId]);
    useEffect(() => { // ADD NEW TASK 
        const options = {
            method: 'POST',
            headers: {
                'auth-token': `${props.userToken}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ task: task, todoId: path })
        };
        const fetchTodo = async () => {
            await fetch(`https://react-todolist-application.herokuapp.com/api/todo/task`, options)
                .then(res => res.json())
                .then(
                    setTimeout(() => {
                        setStatusCreate(false);
                        setTask('');
                        setUpdateState(updateState => !updateState)
                    }, 3000),
                )
        }
        if (rendered) {
            if (task !== '') {
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
    const handleRemove = (id) => {
        setStatusRequest(true); // DISABLE/ENABLE BUTTON FOR DELETE 
        setRendered(true); // ACTIVATE FETCH FOR DELETE TASK ID
        setTaskId(id); // TASK ID WHAT WILL BE DELETED
    }
    const handleSubmit = () => {
        setStatusCreate(true); // DISABLE/ENABLE BUTTON FOR DELETE 
        setRendered(true); // ACTIVATE FETCH FOR DELETE TASK ID
        setForceCreate(forceCreate => !forceCreate); // TASK ID WHAT WILL BE DELETED
    }

    if (taskList === null) {
        currentArray = <h1>Loading...</h1>
    } else {
        currentArray = taskList.map(item => {
            return (
                <div key={item._id} className="taskList-item">
                    <div className="taskList-item-task">
                        {item.task}
                    </div>
                    {!statusRequest
                        ? <Link to="/" className="todoList-elements-delete" disabled={statusRequest}
                            onClick={(event) => { event.preventDefault(); handleRemove(item._id) }}>
                            Delete </Link>
                        : null}
                </div>
            )
        })
    }
    return (
        <div className="taskList">
            <h2>Tasks in the selected list</h2>
            <div className="taskList-elements">
                {currentArray}
            </div>
            <div className="taskList-create">
                <input className="taskList-create-input" value={task} onChange={(e) => { setTask(e.target.value) }} placeholder="Task message..." type="text" />
                {statusCreate
                    ? <img className="spinner" src={Spinner} alt='spinner' />
                    : <Link to="/" onClick={(event) => { event.preventDefault(); if (!statusCreate) handleSubmit() }}>
                        Add task<span></span><span></span><span></span><span></span>
                    </Link>}
                <Link to="/" onClick={(event) => { event.preventDefault(); setTask('') }}>
                    Reset<span></span><span></span><span></span><span></span>
                </Link>
            </div>
        </div >
    )
}


export default withRouter(TaskList)