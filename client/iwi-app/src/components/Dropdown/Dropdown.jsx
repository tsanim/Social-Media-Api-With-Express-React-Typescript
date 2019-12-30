import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Dropdown.css';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function Dropdown(props) {
    return (
        <div className="dropdown">
            <button className="dropbtn"><FontAwesomeIcon icon={faBell} />{props.notifications.length}</button>
            <div className="dropdown-content">
                {
                    props.notifications.map(n => <Link key={n._id} to={`/chat?sender=${n.sender}`}> {n.message} </Link>)
                }
            </div>
        </div>
    )
}

Dropdown.propTypes = {
    notifications: PropTypes.array,
}

export default Dropdown;