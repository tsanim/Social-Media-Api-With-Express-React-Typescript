export default class ChatService {
    static getRoomMessages(socket: any, currentUserId: string, onlineUserId: string) {
        socket.emit('getMessages', { currentUserId, onlineUserId });
    
        return new Promise((resolve, reject) => {
            socket.on('messages', ({ messages }: any) => {
                resolve(messages);
            });
        });
    }

    static getOnlineUsers(socket: any) {
        socket.emit('onlineUsers');
    
        return new Promise((resolve, reject) => {
            socket.on('onlineUsers', ({ onlineUsers }: { onlineUsers: object[] }) => {
                resolve(onlineUsers);
            });
        });
    }

    static joinSenderRoom(socket: any, userId: string, senderId: string) {
        socket.emit('joinSenderRoom', { userId, senderId });
    
        return new Promise((resolve, reject) => {
            socket.on('joinSenderRoom', ({ user }: { user: object }) => {
                resolve(user);
            })
        })
    
    }
}
