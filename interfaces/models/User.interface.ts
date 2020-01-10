import { Document } from "mongoose";
import IPost from "./Post.interface";
import IComment from "./Comment.interface";

export default interface IUser extends Document {
    username: string;
    email: string;
    notifications: string[];
    firstName: string;
    lastName: string;
    imageId: string;
    hashedPassword: string;
    salt: string;
    followers: IUser[] | IUser['_id'];
    subscriptions: IUser[] | IUser['_id'];
    roles: string[];
    posts: IPost[] | IPost['_id'];
    comments: IComment[] | IComment['_id'];
}