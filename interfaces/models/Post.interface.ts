import IUser from "./User.interface";
import { Document } from "mongoose";
import IComment from "./Comment.interface";

export default interface IPost extends Document {
    creator: IUser['_id'],
    text?: string;
    date: string;
    imageId?: string;
    likes?: IUser['_id'][];
    comments?: IComment['_id'][];
}