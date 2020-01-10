import IUser from "./User.interface";
import IPost from "./Post.interface";
import { Document } from "mongoose";

export default interface IComment extends Document {
    creator: IUser['_id'];
    post: IPost['_id'];
    likes: IUser['_id'][];
    text: string;
    date: string;
}