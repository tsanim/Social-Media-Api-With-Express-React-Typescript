import CommentData from "../../Feed/CommentData.interface";

export default interface CommentFormProps {
    postId: string;
    makeCommentHandler: (data: CommentData) => void;
    createSnackbar: (data: any) => void;
}