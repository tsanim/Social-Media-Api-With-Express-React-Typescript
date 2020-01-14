import { PlainUser } from "../User/User.interface";

export default interface Comment {
    creator: PlainUser | string;
    text: string;
    date: string;
    likes: string[] | PlainUser[];
    _id: string;
    id?: string;
}