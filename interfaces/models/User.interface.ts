import { Document } from "mongoose";
import IPost from "./Post.interface";
import IComment from "./Comment.interface";
import INotification from "./Notification.interface";

export default interface IUser extends Document {
    _doc?: any;
    username: string;
    email: string;
    notifications: INotification['_id'][];
    firstName: string;
    lastName: string;
    imageId: string;
    hashedPassword: string;
    salt: string;
    followers: IUser['_id'][];
    subscriptions: IUser['_id'][];
    roles: string[];
    posts: IPost['_id'][];
    comments: IComment['_id'][];
    room?: string;
    authenticate: (password: string) => boolean;
}