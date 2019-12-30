import React from 'react';
import URI from '../../config/config';
import PropTypes from 'prop-types';

function UserChatCard(props) {
    return (
        <figure className={ props.isMine ? "float-right" : null }>
            <img src={`${URI}/feed/image/${props.onlineUser.imageId}`} alt="userImg" />
            <div className="names">
                <figcaption>{props.onlineUser.username}</figcaption>
            </div>
        </figure>
    )
}

UserChatCard.propTypes = {
    onlineUser: PropTypes.object,
    isMine: PropTypes.bool
}


export default UserChatCard;