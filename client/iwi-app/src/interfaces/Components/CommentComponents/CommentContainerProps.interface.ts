import { PlainUser } from "../../User/User.interface";

export default interface CommentContainerProps {
    text: string;
    isLiked: boolean;
    currentUser: PlainUser;
    commentCreator: PlainUser;
    handleDislikeComment: (commentId: string) => void;
    handleLikeComment: (commentId: string) => void;
    handleShowModal: () => void;
}