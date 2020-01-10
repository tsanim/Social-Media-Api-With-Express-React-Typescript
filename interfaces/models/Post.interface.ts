import IUser from "./User.interface";
import { Document } from "mongoose";

export default interface IPost extends Document {
    creator: IUser['_id'],
    text: string;
    date: string;
    imageId: string;
    likes: IUser['_id'] | IUser[];
    comments: string[];
}