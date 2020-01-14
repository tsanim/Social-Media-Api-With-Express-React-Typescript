import IUser from "./User.interface";
import { Document } from "mongoose";

export default interface INotification extends Document {
    message: string;
    room: string;
    sender: IUser['_id']
}