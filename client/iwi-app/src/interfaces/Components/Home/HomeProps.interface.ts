import User from "../../User/User.interface";
import Post from "../../Feed/Post.interface";
import PostData from "../../Feed/PostData.interface";
import Store from "../../Store/Store.interface";
import PostsService from "../../../services/PostsService";
import CommentsService from "../../../services/CommentsService";
import { connect, ConnectedProps } from "react-redux";
import CommentData from "../../Feed/CommentData.interface";

export function filterHomePosts(state: Store) {
    return state.postsReducer.get('posts').filter((post: Post) => {
        const currPostCreatorId = post.getIn(['creator', '_id']);
        const currentUserId = localStorage.getItem('userId');
        const currentUserSubs = state.systemReducer.getIn(['currentUser', 'subscriptions']);

        return ((currPostCreatorId === currentUserId) || (currentUserSubs.some((sub: User) => sub.get('_id') === currPostCreatorId)))
    })
}

const mapState = (state: Store) => {
    return {
        currentUser: state.systemReducer.get('currentUser'),
        posts: filterHomePosts(state),
        fetchStatus: state.systemReducer.get('fetchStatus'),
        connectionStatus: state.systemReducer.get('connectionStatus'),
        errors: state.errorsReducer
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        getUserPosts: (id: string) => dispatch(PostsService.getUserPosts(id)),
        getSubsPosts: () => dispatch(PostsService.getAllSubsPosts()),
        upload: (data: PostData) => dispatch(PostsService.uploadPost(data)),
        like: (postId: string) => dispatch(PostsService.likePost(postId)),
        dislike: (postId: string) => dispatch(PostsService.dislikePost(postId)),
        editUserPost: (data: PostData, postId: string) => dispatch(PostsService.editPost(data, postId)),
        delPost: (postId: string) => dispatch(PostsService.deletePost(postId)),
        likeCom: (_id: string) => dispatch(CommentsService.likeComment(_id)),
        dislikeCom: (_id: string) => dispatch(CommentsService.dislikeComment(_id)),
        deleteCom: (_id: string) => dispatch(CommentsService.deleteComment(_id)),
        makeCom: (data: CommentData) => dispatch(CommentsService.makeComment(data))
    }
}

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

//assign props to new variable because in the future, eventualy, can assign new props, which are not from redux
export type HomeProps = PropsFromRedux;