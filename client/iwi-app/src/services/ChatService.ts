import User, { PlainUser } from "../interfaces/User/User.interface";
import Message from "../interfaces/Feed/Message.interface";

export default class ChatService {
    static getRoomMessages(socket: any, currentUserId: string, onlineUserId: string): Promise<Message[]> {
        socket.emit('getMessages', { currentUserId, onlineUserId });
    
        return new Promise((resolve, reject) => {
            socket.on('messages', ({ messages }: Message[]) => {
                resolve(messages);
            });
        });
    }

    static getOnlineUsers(socket: any): Promise<PlainUser[]> {
        socket.emit('onlineUsers');
    
        return new Promise((resolve, reject) => {
            socket.on('onlineUsers', ({ onlineUsers }: { onlineUsers: PlainUser[] }) => {
                resolve(onlineUsers);
            });
        });
    }

    static joinSenderRoom(socket: any, userId: string, senderId: string): Promise<PlainUser> {
        socket.emit('joinSenderRoom', { userId, senderId });
    
        return new Promise((resolve, reject) => {
            socket.on('joinSenderRoom', ({ user }: { user: PlainUser }) => {
                resolve(user);
            })
        })
    
    }
}
