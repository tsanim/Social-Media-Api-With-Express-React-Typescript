import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import queryString from 'query-string';
import Room from '../../ChatComponents/Room';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import OnlineUsers from '../../ChatComponents/OnlineUsers';
import { getRoomMessages, getOnlineUsers, joinSenderRoom } from '../../../services/chatService';
import { wrapComponent } from 'react-snackbar-alert';

const chatEndPoint = 'localhost:8888'
const socket = io(chatEndPoint);

class Chat extends Component {
    state = {
        onlineUsers: [],
        onlineUser: {},
        isRoomShown: false,
        messages: [],
        infoMessage: '',
        messageText: '',
        typingMessage: '',
        roomId: '',
    }

    showRoomHandler = async (e) => {

        try {
            const onlineUser = this.state.onlineUsers.find(u => u._id === e.currentTarget.id);

            socket.emit('joinRoom', { userId: onlineUser._id, senderId: localStorage.getItem('userId') });
            socket.emit('sendNotification', { senderId: localStorage.getItem('userId'), notificatedUserId: onlineUser._id });
            let stateMessages = await getRoomMessages(socket, localStorage.getItem('userId'), onlineUser._id);

            this.setState(oldState => ({
                onlineUser,
                isRoomShown: true,
                messages: [...stateMessages]
            }));
        } catch (error) {
            console.log(error);
        }
    }

    sendMessageHandler = (e) => {
        e.preventDefault();

        if (this.state.messageText === '') {
            this.props.createSnackbar({
                message: 'Cannot send emtpy message!',
                timeout: 3000
            });

            return;
        }

        socket.emit('sendMessage', { text: this.state.messageText, roomId: this.state.roomId, userId: localStorage.getItem('userId') });

        this.setState({ messageText: '' });
    }

    onInputChangeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onKeyPressHandler = (e) => {
        return e.key === 'Enter' ? this.sendMessageHandler(e) : null;
    }

    onKeyDownHandler = (e) => {
        socket.emit('typing', { username: this.props.currentUser.get('username'), roomId: this.state.roomId });
    }

    onBlurHandler = (e) => {
        socket.emit('stopTyping', { roomId: this.state.roomId });
    }

    onUnmountHandler = () => {
        socket.emit('leaveRoom', { roomId: this.state.roomId, username: this.props.currentUser.get('username') });
    }

    socketIOConfig = () => {
        socket.emit('join', { userId: localStorage.getItem('userId') });

        socket.on('message', ({ message }) => {
            this.setState((oldState) => {
                return {
                    messages: [...oldState.messages, message]
                }
            })
        });

        socket.on('onlineUsers', ({ onlineUsers }) => {
            const currentUserSubs = this.props.currentUser.get('subscriptions').toJS();

            this.setState({
                onlineUsers: onlineUsers.filter(onlineUser => currentUserSubs.some((u) => {
                    return u._id === onlineUser._id.toString()
                }))
            });
        });

        socket.on('typing', ({ username }) => {
            setTimeout(() => {
                this.setState({ typingMessage: `${username} is typing...` })
            }, 500)
        });

        socket.on('stopTyping', (data) => {
            setTimeout(() => {
                this.setState({ typingMessage: '' })
            }, 500)
        });

        socket.on('joinRoom', ({ user }) => {
            this.setState({ roomId: user.roomId });
        });

        socket.on('infoMessage', ({ text }) => {
            this.setState({ infoMessage: text });
        });
    }

    render() {
        return (
            <main>
                <div className="chatWrapper">
                    <h1>Chat with your friends!</h1>

                    {
                        this.state.isRoomShown
                            ? <Room
                                onlineUser={this.state.onlineUser}
                                messages={this.state.messages}
                                infoMessage={this.state.infoMessage}
                                typingMessage={this.state.typingMessage}
                                onInputChangeHandler={this.onInputChangeHandler}
                                onKeyPressHandler={this.onKeyPressHandler}
                                onKeyDownHandler={this.onKeyDownHandler}
                                onBlurHandler={this.onBlurHandler}
                                messageText={this.state.messageText}
                                sendMessageHandler={this.sendMessageHandler}
                                onUnmountHandler={this.onUnmountHandler}
                            />
                            : null
                    }

                    <OnlineUsers
                        onlineUsers={this.state.onlineUsers}
                        showRoomHandler={this.showRoomHandler}
                    />
                </div>
            </main>
        )
    }

    async componentDidUpdate(prevProps) {
        const { sender: oldSender } = queryString.parse(prevProps.location.search);
        const { sender } = queryString.parse(this.props.location.search);

        if ((!oldSender && sender) || (oldSender !== sender)) {
            try {
                let stateMessages = await getRoomMessages(socket, localStorage.getItem('userId'), sender)
                let onlineUser = await joinSenderRoom(socket, localStorage.getItem('userId'), sender);

                this.setState({
                    isRoomShown: true,
                    onlineUser,
                    roomId: onlineUser.roomId,
                    messages: stateMessages
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    async componentDidMount() {
        const { sender } = queryString.parse(this.props.location.search);

        this.socketIOConfig();

        if (this.state.onlineUser._id) {
            try {
                let messages = await getRoomMessages(socket, localStorage.getItem('userId'), this.state.onlineUser._id);

                this.setState({ messages });
            } catch (error) {
                console.log(error);
            }
        }

        if (sender) {
            try {
                let stateMessages = await getRoomMessages(socket, localStorage.getItem('userId'), sender);
                let onlineUser = await joinSenderRoom(socket, localStorage.getItem('userId'), sender);

                this.setState(oldState => {
                    return {
                        isRoomShown: !oldState.isRoomShown,
                        onlineUser,
                        roomId: onlineUser.roomId,
                        messages: stateMessages
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        this.timer = setInterval(async () => {
            try {
                const onlineUsers = await getOnlineUsers(socket);
                const currentUserSubs = this.props.currentUser.get('subscriptions').toJS();

                this.setState({
                    onlineUsers: onlineUsers.filter(onlineUser => currentUserSubs.some((u) => {
                        return u._id === onlineUser._id.toString()
                    }))
                });
            } catch (error) {
                console.log(error);
            }
        }, 2000);
    }

    componentWillUnmount() {
        socket.emit('disconnect', { userId: localStorage.getItem('userId') });
        socket.off();

        this.setState({ infoMessage: '' });
        clearInterval(this.timer);
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.systemReducer.get('currentUser')
    }
}

Chat.propTypes = {
    currentUser: PropTypes.instanceOf(Map),
}

export default connect(mapStateToProps)(wrapComponent(Chat));