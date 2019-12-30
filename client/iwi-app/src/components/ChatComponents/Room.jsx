import React, { useEffect } from 'react';
import Messages from './Messages';
import MessageForm from '../Forms/MessageForm';
import PropTypes from 'prop-types';
import UserChatCard from './UserChatCard';

function Room(props) {
    useEffect(() => {
        return () => {
            props.onUnmountHandler();
        }
    }, []);

    return (
        <div className="chat">
            <header className="chatHeader">
                <UserChatCard 
                    onlineUser={props.onlineUser}
                />
            </header>
            <Messages
                onlineUser={props.onlineUser}
                messages={props.messages}
                infoMessage={props.infoMessage}
            />
            <span className="typing">{props.typingMessage}</span>
            <MessageForm 
                messageText={props.messageText}
                onInputChangeHandler={props.onInputChangeHandler}
                onBlurHandler={props.onBlurHandler}
                onKeyDownHandler={props.onKeyDownHandler}
                onKeyPressHandler={props.onKeyPressHandler}
                sendMessageHandler={props.sendMessageHandler}
            />
        </div>
    )
}

Room.propTypes = {
    onlineUser: PropTypes.object,
    messages: PropTypes.array,
    infoMessage: PropTypes.string,
    typing: PropTypes.string,
    onInputChangeHandler: PropTypes.func,
    onKeyPressHandler: PropTypes.func,
    onKeyDownHandler: PropTypes.func,
    onBlurHandler: PropTypes.func,
    message: PropTypes.string,
    sendMessageHandler: PropTypes.func,
    onUnmountHandler: PropTypes.func
}


export default Room;