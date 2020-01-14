import * as Immutable from "immutable";
import Post, { PlainPost } from "../Feed/Post.interface";

export interface PlainUser {
    _id: string;
    id?: string;
    username: string;
    firstName: string;
    lastName: string;
    imageId: string;
    email: string;
    followers: PlainUser[];
    subscriptions: PlainUser[];
    posts: PlainPost[];
    notifications?: Notification[];
    roomId?: string;
}

export default interface User extends Immutable.Map<string, any> {
    readonly _id: string;
    readonly id?: string;
    readonly username: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly imageId: string;
    readonly email: string;
    readonly followers: Immutable.List<User[]>;
    readonly subscriptions: Immutable.List<User[]>;
    readonly posts: Immutable.List<Post[]>;
    readonly notifications?: Immutable.List<Notification[]>;
    readonly roomId?: string;
}