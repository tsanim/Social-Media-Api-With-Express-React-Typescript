import User from '../models/User';
import logger from '../logger/logger';
import IUser from '../interfaces/models/User.interface';
const onlineUsers: IUser[] = [];

class UsersService {
    addOnlineUser = async (userId: string): Promise<IUser[]> => {
        if (!this.isUserOnline(onlineUsers, userId)) {
            let currentUser = await this.getUserById(userId);
            currentUser = Object.assign({}, currentUser, { room: '' });

            onlineUsers.push(currentUser);
        }

        return onlineUsers;
    }

    removeOnlineUser = (userId: string): void => {
        const userIndex = onlineUsers.findIndex(u => u._id === userId);
        onlineUsers.splice(userIndex, 1);
    }

    getOnlineUsers = (): IUser[] => {
        return onlineUsers;
    }

    isUserOnline = (onlineUsers: IUser[], userId: string): boolean => {
        return onlineUsers.findIndex(obj => {
            return (obj._id ? obj._id.toString() : obj.id.toString()) === userId
        }) > -1;
    }

    getUserById = async (userId: string): Promise<IUser> => {
        try {
            let user = await User.findById(userId);

            return user._doc ? user._doc : user;
        } catch (error) {
            logger.log('error',`Find user with Id: ${userId} error! ${error.message}`, ...error);
        }
    }
}

export default  UsersService;