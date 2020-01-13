import IUser from "./User.interface";
import IMessage from "./Message.interface";
import { Document } from "mongoose";

export default interface IRoom extends Document {
    _doc?: any;
    pairUsers: IUser['_id'][];
    messages: IMessage['_id'][];
}