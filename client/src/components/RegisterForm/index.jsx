import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Spinner from '../helpers/Spinner'
import AuthProvider from '../../services/AuthProvider'
import './styles.scss'

const RegisterForm = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        await AuthProvider.registerUser({ name, email, password }).then((res) => {
            setIsLoading(false)
            if (res.status) {
                setSuccess(true)
            } else {
                setError(res.error)
            }
        })
    }

    return !success ? (
        <div className="loginForm">
            <form className="formJoin" autoComplete="off">
                <h2>Registration form</h2>
                <div className="input-field">
                    <input required onChange={(event) => setEmail(event.target.value)} name="email" type="text" />
                    <label>Enter Your Email</label>
                    <span></span>
                </div>
                <div className="input-field">
                    <input required onChange={(event) => setName(event.target.value)} name="name" type="text" />
                    <label>Enter Your Name</label>
                    <span></span>
                </div>
                <div className="input-field">
                    <input required onChange={(event) => setPassword(event.target.value)} name="password" type="password" />
                    <label>Enter Your Password</label>
                    <span></span>
                </div>
                <span className="errorMessage">{error}</span>
                <div className="formJoin-buttons">
                    {isLoading ? (
                        <Spinner className="spinner-clear" />
                    ) : (
                        <>
                            <Link to="/" onClick={handleSubmit}>
                                Register
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </Link>
                            <Link to="/login">
                                Go back
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </Link>
                        </>
                    )}
                </div>
            </form>
        </div>
    ) : (
        <div className="loginForm">
            <div className="formSuccess">
                <h2 className="formSuccess-success">Registration is confirmed</h2>
                <div className="formJoin-buttons">
                    <Link to="/login">
                        Log in
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RegisterForm)
