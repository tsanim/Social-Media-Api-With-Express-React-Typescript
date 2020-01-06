import * as Immutable from "immutable";
import User, { PlainUser } from "../User/User.interface";
import Comment from "./CommentData.interface";

export interface PlainPost {
    imageId?: string;
    text?: string;
    _id: string;
    likes: PlainUser[] | string[];
    comments: Comment[];
    creator: PlainUser;
    date: string;
}

export default interface Post extends Immutable.Map<string, any> {
    readonly imageId?: string;
    readonly text?: string;
    readonly _id: string;
    readonly likes: Immutable.List<User[] | string[]>;
    readonly comments: Immutable.List<Comment[]>;
    readonly creator: User;
    readonly date: Date;
}