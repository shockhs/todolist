import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { clearErrorMessage, login } from '../../store/actions'
import { getAuthStatus, getErrorMessage } from '../../store/selectors'
import InputField from '../InputField'
import Spinner from '../Spinner'
import './styles.scss'

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
                            <button onClick={handleSubmit} id="loginBtn">
                                Log in
                            </button>
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

LoginForm.propTypes = {
    errorMessage: PropTypes.string,
    authStatus: PropTypes.bool,
    history: PropTypes.shape(),
    login: PropTypes.func,
    clearErrorMessage: PropTypes.func,
}

export const mapStateToProps = (state) => {
    return {
        errorMessage: getErrorMessage(state),
        authStatus: getAuthStatus(state),
    }
}

export default connect(mapStateToProps, { clearErrorMessage, login })(withRouter(LoginForm))
