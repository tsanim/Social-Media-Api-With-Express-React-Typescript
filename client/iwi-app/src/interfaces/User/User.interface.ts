import * as Immutable from "immutable";
import Post, { PlainPost } from "../Feed/Post.interface";

export interface PlainUser {
    _id: string;
    id?: string;
    username: string;
    firstNamess: string;
    lastNamesss: string;
    imageId: string;
    email: string;
    followers: PlainUser[];
    subscribers: PlainUser[];
    posts: PlainPost[];
    notifications?: Notification[];
    roomId?: string;
}

export default interface User extends Immutable.Map<string, any> {
    readonly _id: string;
    readonly id?: string;
    readonly username: string;
    readonly firstNamess: string;
    readonly lastNamesss: string;
    readonly imageId: string;
    readonly email: string;
    readonly followers: Immutable.List<User[]>;
    readonly subscribers: Immutable.List<User[]>;
    readonly posts: Immutable.List<Post[]>;
    readonly notifications?: Immutable.List<Notification[]>;
    readonly roomId?: string;
}