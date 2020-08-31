import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { getAuthStatus } from '../../store/selectors'
import LoginForm from '../LoginForm'
import RegisterForm from '../RegisterForm'
import RouteGuard from '../RouteGuard'
import TodoList from '../TodoList'

const Template = ({ authStatus, login }) => {
    return (
        <Switch>
            <Route exact path="/register" render={() => <RegisterForm />} />
            <Route exact path="/login" render={() => <LoginForm />} />
            <RouteGuard path="/">
                <TodoList />
            </RouteGuard>
        </Switch>
    )
}

LoginForm.propTypes = {
    authStatus: PropTypes.bool,
    login: PropTypes.func,
}

const mapStateToProps = (state) => ({
    authStatus: getAuthStatus(state),
})

const TemplateContainer = connect(mapStateToProps)(Template)

export default TemplateContainer
