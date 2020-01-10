import IUser from "./User.interface";

export default interface IPost {
    creator: IUser['_id'],
    text: string;
    date: string;
    imageId: string;
    likes: IUser['_id'] | IUser[];
    comments: string[];
}