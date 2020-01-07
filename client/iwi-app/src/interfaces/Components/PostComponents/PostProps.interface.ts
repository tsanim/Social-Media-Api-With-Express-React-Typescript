import { PlainPost } from "../../Feed/Post.interface";
import { PlainUser } from "../../User/User.interface";
import PostData from "../../Feed/PostData.interface";
import CommentData from "../../Feed/CommentData.interface";

export default interface PostProps {
    post: PlainPost;
    currentUser: PlainUser;
    likePostHandler: (postId: string) => void;
    dislikePostHandler: (postId: string) => void;
    deletePostHandler: (postId: string) => void;
    likeCommentHandler: (commentId: string) => void;
    dislikeCommentHandler: (commentId: string) => void;
    deleteCommentHandler: (commentId: string) => void;
    makeCommentHandler: (data: CommentData) => void;
    editUserPostHandler: (data: PostData, postId: string) => void;
}
