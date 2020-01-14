import { PlainUser } from "../../User/User.interface";
import Comment from "../../Feed/Comment.interface";

export default interface CommentProps {
    comment: Comment;
    currentUser: PlainUser;
    likeCommentHandler: (commentId: string) => void;
    dislikeCommentHandler: (commentId: string) => void;
    deleteCommentHandler: (commentId: string) => void;
}