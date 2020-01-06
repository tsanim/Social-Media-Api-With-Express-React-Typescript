import PostData from "../../Feed/PostData.interface";

export default interface EditFeedFormProps {
    feedId: string;
    text: string;
    editUserPostHandler: (data: PostData, postId: string) => void;
    handleShowEditForm: () => void;
}