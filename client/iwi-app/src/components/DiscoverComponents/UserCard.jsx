import React from 'react';
import URI from '../../config/config';
import PropTypes from 'prop-types';

function UserCard(props) {
    const { imageId, username, firstName, lastName } = props.user;

    return (
            <div className="card">
                <figure>
                    <img src={`${URI}/feed/image/${imageId}`} alt="" />
                    <div className="names">
                        <figcaption>{username}</figcaption>
                        <span className="fullname">{firstName} {lastName}</span>
                    </div>
                </figure>
            </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.object,
}

export default UserCard;