import React, { useState, useEffect, useRef, useCallback } from 'react'
import { withRouter, Link } from 'react-router-dom'
import './RegisterForm.css';


const RegisterForm = (props) => {
    const [email, setEmail] = useState('');
    const [isSending, setIsSending] = useState(false)
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const isMounted = useRef(true)
    const handleSubmit = (event) => {
        event.preventDefault();
        sendRequest(name, email, password);
    }
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])
    const sendRequest = useCallback(async (nameReq, emailReq, passwordReq) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ name: nameReq, email: emailReq, password: passwordReq })
        };
        const fetchReg = async () => {
            return await fetch('https://react-todolist-application.herokuapp.com/api/user/register', options)
                .then(res => res.json())
                .then(res => { if (res.resultCode === 200) {setSuccess(true)} else {setError(res.error)} })
        }
        if (isSending) return
        setIsSending(true)
        fetchReg();
        if (isMounted.current)
            setIsSending(false)// eslint-disable-next-line
    }, [isSending])
    return (
        (!success
            ? <div className="loginForm">
                <form className="formJoin" autocomplete="off">
                    <h2>Registration form</h2>
                    <div className="input-field">
                        <input required onChange={event => setName(event.target.value)} name="name" type="text" />
                        <label>Enter Your Name</label>
                        <span></span>
                    </div>
                    <div className="input-field">
                        <input required onChange={event => setPassword(event.target.value)} name="password" type="password" />
                        <label>Enter Your Password</label>
                        <span></span>
                    </div>
                    <div className="input-field">
                        <input required onChange={event => setEmail(event.target.value)} name="email" type="text" />
                        <label>Enter Your Email</label>
                        <span></span>
                    </div>
                    <span className="errorMessage">{error}</span>
                    <div className="formJoin-buttons">
                        <Link to="/" onClick={(event) => { handleSubmit(event) }}>
                            register<span></span><span></span><span></span><span></span>
                        </Link>
                    </div>
                </form>
            </div>
            : <div className="loginForm">
                <div className="formSuccess">
                    <h2 className="formSuccess-success">Registration is confirmed</h2>
                    <div className="formJoin-buttons">
                        <Link to="/login">
                            Log in<span></span><span></span><span></span><span></span>
                        </Link>
                    </div>
                </div>
            </div>)

    )
}

export default withRouter(RegisterForm)