import { Document } from "mongoose";

export default interface IUser extends Document {
    username: string;
    email: string;
    notifications: string[];
    firstName: string;
    lastName: string;
    imageId: string;
    hashedPassword: string;
    salt: string;
    followers: IUser[];
    subscriptions: IUser[];
    roles: string[];
    posts: string[];
    comments: string[];
}