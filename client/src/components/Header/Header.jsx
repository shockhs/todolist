import React from 'react'
import './Header.css'
import { Link, withRouter } from 'react-router-dom';


const Header = ({ callExit }) => {
    const handleExit = () => {
        callExit();
    }
    return (
        <nav className="navbar">
            <Link to="/">
                todo
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </Link>
            <Link to="/" onClick={event => { event.preventDefault(); handleExit() }}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Выход</Link>
        </nav>
    );
}



export default withRouter(Header)
