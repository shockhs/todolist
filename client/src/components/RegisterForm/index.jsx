import './styles.scss'

import { Link, withRouter } from 'react-router-dom'
import React, { useState } from 'react'

import AuthProvider from '../../services/AuthProvider'
import InputField from '../InputField'
import Spinner from '../Spinner'

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

                <InputField label="Enter Your Email" handleChange={setEmail} value={email} name="email" type="text" />
                <InputField label="Enter Your Name" handleChange={setName} value={name} name="name" type="text" />
                <InputField
                    label="Enter Your Password"
                    handleChange={setPassword}
                    value={password}
                    name="password"
                    type="password"
                />
                <span className="errorMessage">{error}</span>
                <div className="formJoin-buttons">
                    {isLoading ? (
                        <Spinner className="spinner-clear" />
                    ) : (
                        <>
                            <Link to="/" onClick={handleSubmit}>
                                Register
                            </Link>
                            <Link to="/login">Go back</Link>
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
                    <Link to="/login">Log in</Link>
                </div>
            </div>
        </div>
    )
}

export default withRouter(RegisterForm)
