import { Document } from "mongoose";

export default interface ILog extends Document {
    timestamp: string;
    level: string;
    message: string;
}