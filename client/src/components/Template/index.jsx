import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LoginForm from '../LoginForm'
import TodoList from '../TodoList'
import RegisterForm from '../RegisterForm'
import RouteGuard from '../RouteGuard'
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

const mapStateToProps = (state) => ({
    authStatus: getAuthStatus(state),
})

const TemplateContainer = connect(mapStateToProps)(Template)

export default TemplateContainer
