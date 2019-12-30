function getRoomMessages(socket, currentUserId, onlineUserId) {
    socket.emit('getMessages', { currentUserId, onlineUserId });

    return new Promise((resolve, reject) => {
        socket.on('messages', ({ messages }) => {
            resolve(messages);
        });
    });
}

function getOnlineUsers(socket) {
    socket.emit('onlineUsers');

    return new Promise((resolve, reject) => {
        socket.on('onlineUsers', ({ onlineUsers }) => {
            resolve(onlineUsers);
        });
    });
}

function joinSenderRoom(socket, userId, senderId) {
    socket.emit('joinSenderRoom', { userId, senderId });

    return new Promise((resolve, reject) => {
        socket.on('joinSenderRoom', ({ user }) => {
            resolve(user);
        })
    })

}

export {
    getRoomMessages,
    getOnlineUsers,
    joinSenderRoom
}