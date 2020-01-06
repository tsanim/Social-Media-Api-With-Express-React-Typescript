import { PlainUser } from "../../User/User.interface";
import Comment from "../../Feed/CommentData.interface";

export default interface PostMetaProps {
    handleShowLikesModal: () => void;
    handleShowComments: () => void;
    areCommentsShown: boolean;
    comments: Comment[];
    postId: string;
    currentUser: PlainUser;
    likesCount: number;
    likesString: string;
    likeCommentHandler: (commentId: string) => void;
    dislikeCommentHandler: (commentId: string) => void;
    deleteCommentHandler: (commentId: string) => void;
    makeCommentHandler: (data: Comment) => void;
}