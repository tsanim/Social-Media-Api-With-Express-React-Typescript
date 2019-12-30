import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faSignOutAlt, faImages } from '@fortawesome/free-solid-svg-icons';
import { Detector } from "react-detect-offline";
import PropTypes from 'prop-types';

import URI from '../../../../config/config';
import Dropdown from '../../../Dropdown/Dropdown';

function Nav(props) {
    const { imageId } = props.user;

    return (
        <nav id="main-nav">
            <ul>
                <Detector
                    render={({ online }) => {
                        if (online) {
                            props.switchToOnline();
                        } else {
                            props.switchToOffline();
                        }

                        return (
                            <li className={`status ${online ? 'online' : 'offline'}`}>
                            </li>
                        )
                    }}
                />
                <li>
                    <Link to="/MyProfile">
                        <figure className="nav-profilePic">
                            <img src={`${URI}/feed/image/${imageId}`} alt="" />
                            <figcaption>{localStorage.getItem('username')}</figcaption>
                        </figure>
                    </Link>
                </li>
                <li><Link to="/"><FontAwesomeIcon icon={faHome} /> HOME</Link></li>
                <li><Link to="/discover"><FontAwesomeIcon icon={faUsers} /> DISCOVER</Link></li>
                <li><Link to="/searchPosts"><FontAwesomeIcon icon={faImages} /> SEARCH</Link></li>
                <li> <Dropdown
                    notifications={props.notifications}
                />
                </li>
                <li><Link to="/chat"><FontAwesomeIcon icon={faUsers} /> CHAT</Link></li>
                <li><Link to="/signin" onClick={props.signoutHandler}><FontAwesomeIcon icon={faSignOutAlt} /> LOGOUT</Link></li>
            </ul>
        </nav>
    )
}

Nav.propTypes = {
    user: PropTypes.object,
    resetUserPostsHandler: PropTypes.func,
    signoutHandler: PropTypes.func,
    switchToOffline: PropTypes.func,
    switchToOnline: PropTypes.func,
}

export default Nav;