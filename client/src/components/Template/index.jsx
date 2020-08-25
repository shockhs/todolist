import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Switch, Route } from 'react-router-dom'
import LoginForm from '../LoginForm'
import TodoList from '../TodoList'
import RegisterForm from '../RegisterForm'
import { getAuthStatus } from '../../store/selectors'

const Template = ({ authStatus, login, ...props }) => {
    const { component: path } = props
    let renderComponent

    if (authStatus) {
        renderComponent = <TodoList />
    } else {
        renderComponent = <LoginForm />
    }

    return (
        <Switch>
            <Route exact path="/login" render={() => <LoginForm />} />
            <Route exact path="/register" render={() => <RegisterForm />} />
            <Route path={path} render={() => renderComponent} />
            <Route path="/" render={() => <TodoList />} />
        </Switch>
    )
}

const mapStateToProps = (state) => {
    return {
        authStatus: getAuthStatus(state),
    }
}

const TemplateContainer = connect(mapStateToProps)(withRouter(Template))

export default TemplateContainer
