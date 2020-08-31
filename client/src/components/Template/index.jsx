import { Route, Switch } from 'react-router-dom'

import LoginForm from '../LoginForm'
import PropTypes from 'prop-types'
import React from 'react'
import RegisterForm from '../RegisterForm'
import RouteGuard from '../RouteGuard'
import TodoList from '../TodoList'
import { connect } from 'react-redux'
import { getAuthStatus } from '../../store/selectors'

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
