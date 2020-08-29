import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAuthStatus } from '../../store/selectors'
import PropTypes from 'prop-types'

export const RouteGuard = ({ path, exact, children, authStatus }) => {
    return authStatus ? (
        <Route path={path} exact={exact}>
            {children}
        </Route>
    ) : (
        <Redirect to="/login" />
    )
}

RouteGuard.propTypes = {
    path: PropTypes.string,
    exact: PropTypes.bool,
    authStatus: PropTypes.bool,
    children: PropTypes.node,
}

const mapStateToProps = (state) => {
    return {
        authStatus: getAuthStatus(state),
    }
}

const Guard = connect(mapStateToProps)(RouteGuard)

export default Guard
