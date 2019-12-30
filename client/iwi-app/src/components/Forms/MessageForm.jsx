import React from 'react';
import PropTypes from 'prop-types';

function MessageForm(props) {
    return (
        <div className="messageForm">
            <form id="messageForm">
                <input
                    type="text"
                    placeholder="Type a message"
                    name="messageText"
                    value={props.messageText}
                    onChange={props.onInputChangeHandler}
                    onKeyPress={props.onKeyPressHandler}
                    onKeyDown={props.onKeyDownHandler}
                    onBlur={props.onBlurHandler}
                />
                <input type="button" onClick={props.sendMessageHandler} value="Send" />
            </form>
        </div>
    )
}

MessageForm.propTypes = {
    messageText: PropTypes.string,
    onInputChangeHandler: PropTypes.func,
    onKeyPressHandler: PropTypes.func,
    onFocusHandler: PropTypes.func,
    onBlurHandler: PropTypes.func,
    sendMessageHandler: PropTypes.func,
    onKeyDownHandler: PropTypes.func,
}

export default MessageForm;
