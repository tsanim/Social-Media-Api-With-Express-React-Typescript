import IUser from "./User.interface";
import { Document } from "mongoose";

export default interface IMessage extends Document {
    text: string;
    room: string;
    creator: IUser['_id']
}