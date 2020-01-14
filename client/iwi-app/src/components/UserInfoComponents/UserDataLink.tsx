import React from 'react';
import { Link } from 'react-router-dom';
import URI from '../../config/config';
import PropTypes from 'prop-types';
import UserDataLinkProps from '../../interfaces/Components/UserDataComponents/UserDataLinkProps.interface';

function UserDataLink(props: UserDataLinkProps) {
    const { _id, id, imageId, username } = props.user;

    return (
        <Link to={"/profile/" + (_id ? _id : id)}>
            <img src={`${URI}/feed/image/${imageId}`} alt="userPic" />
            <figcaption>{username}</figcaption>
        </Link>
    )
}

UserDataLink.propTypes = {
    user: PropTypes.object,
}

export default UserDataLink;