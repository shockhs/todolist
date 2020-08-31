import './Header.scss'

import { Link, withRouter } from 'react-router-dom'

import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ callExit }) => {
    const handleExit = () => {
        callExit()
    }

    return (
        <nav className="navbarHeader">
            <h1>todo</h1>
            <Link
                to="/"
                onClick={(event) => {
                    event.preventDefault()
                    handleExit()
                }}
            >
                Выход
            </Link>
        </nav>
    )
}

Header.propTypes = {
    callExit: PropTypes.func,
}

export default withRouter(Header)
