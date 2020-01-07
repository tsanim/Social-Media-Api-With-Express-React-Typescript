import SearchData from "../../SearchData.interface";
import PostData from "../../Feed/PostData.interface";
import Store from "../../Store/Store.interface";
import PostsService from "../../../services/PostsService";
import CommentsService from "../../../services/CommentsService";
import CommentData from "../../Feed/CommentData.interface";
import { connect, ConnectedProps } from "react-redux";
import { AppThunkDispatch } from "../../../types";

const mapState = (state: Store) => {
    return {
        fetchStatus: state.systemReducer.get('fetchStatus'),
        currentUser: state.systemReducer.get('currentUser'),
        foundPosts: state.postsReducer.get('foundPosts')
    }
}

const mapDispatch = (dispatch: AppThunkDispatch) => {
    return {
        search: (data: SearchData) => dispatch(PostsService.searchPosts(data)),
        like: (postId: string) => dispatch(PostsService.likePost(postId)),
        dislike: (postId: string) => dispatch(PostsService.dislikePost(postId)),
        delPost: (postId: string) => dispatch(PostsService.deletePost(postId)),
        editUserPost: (data: PostData, postId: string) => dispatch(PostsService.editPost(data, postId)),
        likeCom: (_id: string) => dispatch(CommentsService.likeComment(_id)),
        dislikeCom: (_id: string) => dispatch(CommentsService.dislikeComment(_id)),
        deleteCom: (_id: string) => dispatch(CommentsService.deleteComment(_id)),
        makeCom: (data: CommentData) => dispatch(CommentsService.makeComment(data)),
    }
}

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

//assign props to new variable because in the future, eventualy, can assign new props, which are not from redux
export type SearchPostsProps = PropsFromRedux; 