import Comment from "../../Feed/CommentData.interface";

export default interface CommentFormProps {
    postId: string;
    makeCommentHandler: (data: Comment) => void;
    createSnackbar: (data: any) => void;
}