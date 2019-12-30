import React from 'react';
import PropTypes from 'prop-types';
import ReactEmoji from 'react-emoji';
import UserChatCard from './UserChatCard';

function Message(props) {
    return (
        <div className={`chat-message column ${props.isMine ? 'float-right' : null}`}>
            <UserChatCard
                onlineUser={props.message.creator}
                isMine={props.isMine}
            />
            <span className={props.isMine ? "mine" : null}>{ReactEmoji.emojify(props.message.text)}</span>
        </div>
    )
}

Message.propTypes = {
    isMine: PropTypes.bool,
    message: PropTypes.object
}


export default Message;


