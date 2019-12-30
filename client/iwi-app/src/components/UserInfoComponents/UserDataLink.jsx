import React from 'react';
import { Link } from 'react-router-dom';
import URI from '../../config/config';
import PropTypes from 'prop-types';

function UserDataLink(props) {
    const { _id, imageId, username } = props.user;

    return (
        <Link to={"/profile/" + _id}>
            <img src={`${URI}/feed/image/${imageId}`} alt="userPic" />
            <figcaption>{username}</figcaption>
        </Link>
    )
}

UserDataLink.propTypes = {
    user: PropTypes.object,
}

export default UserDataLink;