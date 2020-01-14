import Comment from "../../Feed/Comment.interface";
import { PlainUser } from "../../User/User.interface";
import CommentData from "../../Feed/CommentData.interface";

export default interface CommentsListProps {
    comments: Comment[];
    postId: string;
    currentUser: PlainUser;
    likeCommentHandler: (commentId: string) => void;
    makeCommentHandler: (data: CommentData) => void;
    dislikeCommentHandler: (commentId: string) => void;
    deleteCommentHandler: (commentId: string) => void;
}