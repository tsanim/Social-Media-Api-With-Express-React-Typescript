import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import PropTypes from 'prop-types';
import Message from './Message';

function Messages(props) {
    return (
        <ScrollToBottom className="messagesContainer">
            <p className="msg">{props.infoMessage}</p>
            <ul>
                {
                    props.messages.map((m, i) => {
                        let liClass = i === 0 ? 'clearfix' : null;
                        let isMine = m.creator._id === localStorage.getItem('userId');

                        return (
                            (<li key={i} className={liClass}>
                                <Message 
                                    isMine={isMine}
                                    message={m}
                                />
                            </li>)
                        )
                    })
                }
            </ul>
        </ScrollToBottom>
    )
}

Messages.propTypes = {
    infoMessage: PropTypes.string,
    messages: PropTypes.array,
}

export default Messages;