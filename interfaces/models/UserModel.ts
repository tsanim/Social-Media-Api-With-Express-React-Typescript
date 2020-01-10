import { Model } from "mongoose";
import IUser from "./User.interface";

export default interface UserModel extends Model<IUser> {
    seedAdmin: () => Promise<IUser>
}