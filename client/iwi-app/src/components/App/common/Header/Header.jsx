import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Header(props) {
    return (
        <header>
            <div className="logo">
                <Link to="/"><h1>iWi</h1></Link>
            </div>
            {
                localStorage.getItem('username') 
                ? <Nav
                    user={props.user}
                    signoutHandler={props.signoutHandler}
                    switchToOffline={props.switchToOffline}
                    switchToOnline={props.switchToOnline}
                    notifications={props.notifications}
                    showDropDownHandler={props.showDropDownHandler}
                />
                : null
            }
        </header>
    )
}

Header.propTypes = {
    user: PropTypes.object,
    resetUserPostsHandler: PropTypes.func,
    signoutHandler: PropTypes.func,
    switchToOffline: PropTypes.func,
    switchToOnline: PropTypes.func,
}

export default Header;