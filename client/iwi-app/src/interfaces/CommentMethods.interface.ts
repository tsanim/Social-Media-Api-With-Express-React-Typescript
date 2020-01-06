export default interface CommentMethods {
    likeCom: (commentId: string) => void;
    dislikeCom: (commentId: string) => void;
    deleteCom: (commentId: string) => void;
    makeCom: (data: { text: string, postId: string }) => void
}