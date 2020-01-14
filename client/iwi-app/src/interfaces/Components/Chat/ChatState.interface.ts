import User, { PlainUser } from "../../User/User.interface";
import Message from "../../Feed/Message.interface";

export default interface ChatState {
    onlineUsers: User[] | PlainUser[];
    onlineUser: User | PlainUser;
    isRoomShown: boolean;
    messages: Message[];
    infoMessage: string;
    messageText: string;
    typingMessage: string;
    roomId: string;
}