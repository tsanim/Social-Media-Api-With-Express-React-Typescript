import User from "../../User/User.interface";
import Message from "../../Feed/Message.interface";

export default interface ChatState {
    onlineUsers: User[];
    onlineUser: User;
    isRoomShown: boolean;
    messages: Message[];
    infoMessage: string;
    messageText: string;
    typingMessage: string;
    roomId: string;
}