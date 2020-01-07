import { RouteComponentProps } from "react-router-dom";
import User from "../../User/User.interface";
import * as Immutable from "immutable";
import Post from "../../Feed/Post.interface";
import PostData from "../../Feed/PostData.interface";
import Store from "../../Store/Store.interface";
import PostsService from "../../../services/PostsService";
import CommentsService from "../../../services/CommentsService";
import CommentData from "../../Feed/CommentData.interface";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: Store) => {
    return {
        currentUser: state.systemReducer.get('currentUser'),
        userPosts: state.postsReducer.get('posts').filter((post: Post) => post.getIn(['creator', '_id']) === localStorage.getItem('userId')),
        fetchStatus: state.systemReducer.get('fetchStatus'),
        connectionStatus: state.systemReducer.get('connectionStatus')
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        upload: (data: PostData) => dispatch(PostsService.uploadPost(data)),
        like: (postId: string) => dispatch(PostsService.likePost(postId)),
        dislike: (postId: string) => dispatch(PostsService.dislikePost(postId)),
        delPost: (postId: string) => dispatch(PostsService.deletePost(postId)),
        getUserPosts: (id: string) => dispatch(PostsService.getUserPosts(id)),
        editUserPost: (data: PostData, postId: string) => dispatch(PostsService.editPost(data, postId)),
        likeCom: (_id: string) => dispatch(CommentsService.likeComment(_id)),
        dislikeCom: (_id: string) => dispatch(CommentsService.dislikeComment(_id)),
        deleteCom: (_id: string) => dispatch(CommentsService.deleteComment(_id)),
        makeCom: (data: CommentData) => dispatch(CommentsService.makeComment(data)),
    }
}

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

//assign props to new variable because in the future, eventualy, can assign new props, which are not from redux
export type MyProfileProps = PropsFromRedux;