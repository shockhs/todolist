import React, { useState, useEffect } from 'react'
import { login, clearErrorMessage } from '../../store/actions'
import { getErrorMessage, getAuthStatus } from '../../store/selectors'
import { connect } from 'react-redux'
import Spinner from '../Spinner'
import { withRouter, Link } from 'react-router-dom'
import './styles.scss'
import InputField from '../InputField'

export const LoginForm = ({ errorMessage, authStatus, clearErrorMessage, history, login }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [statusRequest, setStatusRequest] = useState(false)
    const [password, setPassword] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()
        clearErrorMessage()
        if (!(email && password)) {
            setError('Поля должны быть заполнены')
        } else {
            setStatusRequest(true)
            login({ email, password })
        }
    }

    useEffect(() => {
        if (authStatus) history.push('/')
    }, [authStatus, history])

    useEffect(() => {
        if (email && password) {
            setStatusRequest(false)
            setError(errorMessage)
        } // eslint-disable-next-line
    }, [errorMessage])

    return (
        <div className="loginForm">
            <form className="formJoin" autoComplete="off">
                <h2>Login</h2>
                <InputField label="Please Enter Your Email" handleChange={setEmail} value={email} name="email" type="text" />
                <InputField
                    label="Please Enter Your Password"
                    handleChange={setPassword}
                    value={password}
                    name="password"
                    type="password"
                />
                <span className="errorMessage">{error}</span>
                <div className="formJoin-buttons">
                    {!statusRequest ? (
                        <>
                            <Link to="/" onClick={handleSubmit}>
                                Log in
                            </Link>
                            <Link to="/register">Register</Link>
                        </>
                    ) : (
                        <Spinner className="spinner-clear" />
                    )}
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: getErrorMessage(state),
        authStatus: getAuthStatus(state),
    }
}

export default connect(mapStateToProps, { clearErrorMessage, login })(withRouter(LoginForm))
