import PostsTypes from "../../../store/actions/postsAtions/actionTypes";

export interface MakePost {
    type: typeof PostsTypes.MAKE_POST;
    data: any;
}

export interface SearchPosts {
    type: typeof PostsTypes.SEARCH_POSTS;
    data: any;
}

export interface SetUserPosts {
    type: typeof PostsTypes.SET_USER_POSTS;
    data: any;
}

export interface DeletePost {
    type: typeof PostsTypes.DELETE_POST;
    data: any;
}

export interface DeleteFoundPostComment {
    type: typeof PostsTypes.DELETE_COMMENT_FOUND_POST;
    data: any;
}

export interface DeleteComment {
    type: typeof PostsTypes.DELETE_COMMENT;
    data: any;
}

export interface EditPost {
    type: typeof PostsTypes.EDIT_POST;
    data: any;
}

export interface GetSubsPosts {
    type: typeof PostsTypes.GET_SUB_USERS_POSTS;
    data: any;
}

export interface ResetPosts {
    type: typeof PostsTypes.RESET_POSTS;
}

export interface EditUserInfo {
    type: typeof PostsTypes.EDIT_USER_INFO;
    data: any;
}

export interface GetAllUsersPosts {
    type: typeof PostsTypes.GET_USER_POSTS;
    data: any;
}

export interface CommentPost {
    type: typeof PostsTypes.COMMENT_POST;
    data: any;
}

export interface CommentFoundPost {
    type: typeof PostsTypes.COMMENT_FOUND_POST;
    data: any;
}