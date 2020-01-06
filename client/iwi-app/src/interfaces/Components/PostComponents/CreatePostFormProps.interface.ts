import PostData from "../../Feed/PostData.interface";
import { PlainUser } from "../../User/User.interface";

export default interface CreatePostFormProps {
    user: PlainUser,
    uploadHandler: (data: PostData) => void;
}