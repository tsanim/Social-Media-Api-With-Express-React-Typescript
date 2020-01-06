import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderProps from '../../../../interfaces/Components/Header/HeaderProps.interface';

function Header(props: HeaderProps) {
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
    signoutHandler: PropTypes.func,
    switchToOffline: PropTypes.func,
    switchToOnline: PropTypes.func,
}

export default Header;