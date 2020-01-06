import * as Immutable from "immutable";
import User from "../../User/User.interface";
import Post from "../../Feed/Post.interface";
import { RouteComponentProps } from "react-router-dom";
import Store from "../../Store/Store.interface";
import Comment from "../../Feed/CommentData.interface";
import UsersService from "../../../services/UsersService";
import PostsService from "../../../services/PostsService";
import CommentsService from "../../../services/CommentsService";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: Store) => {
    return {
        user: state.usersReducer.get('foundUser'),
        foundUserPosts: state.postsReducer.get('posts').filter((post: Post) => post.getIn(['creator', '_id']) === (state.usersReducer.getIn(['foundUser', 'id']) ? state.usersReducer.getIn(['foundUser', 'id']) : state.usersReducer.getIn(['foundUser', '_id']))),
        currentUser: state.systemReducer.get('currentUser')
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        follow: (userId: string) => dispatch(UsersService.followUser(userId)),
        unfollow: (userId: string) => dispatch(UsersService.unfollowUser(userId)),
        getUserInfo: (userId: string) => dispatch(UsersService.getUser(userId)),
        like: (postId: string) => dispatch(PostsService.likePost(postId)),
        dislike: (postId: string) => dispatch(PostsService.dislikePost(postId)),
        likeCom: (_id: string) => dispatch(CommentsService.likeComment(_id)),
        dislikeCom: (_id: string) => dispatch(CommentsService.dislikeComment(_id)),
        deleteCom: (_id: string) => dispatch(CommentsService.deleteComment(_id)),
        makeCom: (data: Comment) => dispatch(CommentsService.makeComment(data))
    }
}

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>

export type UserProfileProps = PropsFromRedux & RouteComponentProps<{ userId: string }>; 