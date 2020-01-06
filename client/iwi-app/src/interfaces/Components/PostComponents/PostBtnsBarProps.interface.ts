import PostMethods from "../../PostMethods.interface";

export default interface PostBtnsBarProps {
    btnsDivClassName: string;
    isLiked: boolean;
    areCommentsShown: boolean;
    creatorId: string;
    handleDislikePost: () => void;
    handleLikePost: () => void;
    handleShowComments: () => void;
    handleShowModal: () => void;
    handleShowEditForm: () => void;
}