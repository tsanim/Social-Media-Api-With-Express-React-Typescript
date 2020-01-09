import User from '../models/User';
const onlineUsers = [];
import logger from '../logger/logger';

class UsersService {
    addOnlineUser = async (userId) => {
        if (!this.isUserOnline(onlineUsers, userId)) {
            const currentUser = await this.getUserById(userId);

            onlineUsers.push({ ...currentUser, room: '' });
        }

        return onlineUsers;
    }

    removeOnlineUser = (userId) => {
        const userIndex = onlineUsers.findIndex(u => u._id === userId);
        onlineUsers.splice(userIndex, 1);
    }

    getOnlineUsers = () => {
        return onlineUsers;
    }

    isUserOnline = (onlineUsers, userId) => {
        return onlineUsers.findIndex(obj => {
            return (obj._id ? obj._id.toString() : obj.id.toString()) === userId
        }) > -1;
    }

    getUserById = async (userId) => {
        try {
            let user = await User.findById(userId);

            return user._doc ? user._doc : user;
        } catch (error) {
            logger.log('error',`Find user with Id: ${userId} error! ${error.message}`, ...error);
        }
    }
}

export default  UsersService;