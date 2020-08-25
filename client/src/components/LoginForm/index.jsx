import React, { useState, useEffect } from 'react'
import { loadData, clearErrorMessage } from '../../store/actions'
import { getErrorMessage } from '../../store/selectors'
import { useDispatch, connect } from 'react-redux'
import Spinner from '../helpers/Spinner'
import { withRouter, Link } from 'react-router-dom'
import './styles.scss'

const LoginForm = ({ errorMessage, clearErrorMessage, ...props }) => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [statusRequest, setStatusRequest] = useState(false)
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const handleSubmit = (event) => {
        event.preventDefault()
        clearErrorMessage()
        if (!(email && password)) {
            setError('Поля должны быть заполнены')
        } else {
            setStatusRequest(true)
            dispatch(loadData({ email, password }))
        }
    }

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
                <div className="input-field">
                    <input required onChange={(event) => setEmail(event.target.value)} name="email" type="text" />
                    <label>Please Enter Your Email</label>
                    <span></span>
                </div>
                <div className="input-field">
                    <input required onChange={(event) => setPassword(event.target.value)} name="password" type="password" />
                    <label>Please Enter Your Password</label>
                    <span></span>
                </div>
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
    }
}

export default connect(mapStateToProps, { clearErrorMessage })(withRouter(LoginForm))
