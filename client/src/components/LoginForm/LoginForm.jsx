import React, { useState, useEffect } from 'react'
import { loadData, clearErrorMessage } from '../../redux/action';
import { useDispatch, connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import './LoginForm.css'
import { getErrorMessage } from '../../redux/selectors/App-page';



const LoginForm = ({ errorMessage, clearErrorMessage, ...props }) => {
    if (props.history.location.pathname !== ('/login' || '/register')) {
        props.history.push('/login');
    }
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();
        clearErrorMessage();
        dispatch(loadData({ email, password }));
    }
    useEffect(() => {
        if (email && password) {
            setError(errorMessage)
        }// eslint-disable-next-line
    }, [errorMessage])
    return (
        <div className="loginForm">
            <form className="formJoin" autocomplete="off">
                <h2>Login</h2>
                <div className="input-field">
                    <input required onChange={event => setEmail(event.target.value)} name="email" type="text" />
                    <label>Please Enter Your Email</label>
                    <span></span>
                </div>
                <div className="input-field">
                    <input required onChange={event => setPassword(event.target.value)} name="password" type="password" />
                    <label>Please Enter Your Password</label>
                    <span></span>
                </div>
                <span className="errorMessage">{error}</span>
                <div className="formJoin-buttons">
                    <Link to="/" onClick={(event) => { handleSubmit(event) }}>
                        Log in<span></span><span></span><span></span><span></span>
                    </Link>
                    <Link to="/register">
                        register<span></span><span></span><span></span><span></span>
                    </Link>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: getErrorMessage(state)
    }
}

export default connect(mapStateToProps, { clearErrorMessage })(withRouter(LoginForm));