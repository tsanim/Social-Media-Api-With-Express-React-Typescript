import ActionTypes from './actionTypes';
import { MakePost, SearchPosts, SetUserPosts, DeletePost, DeleteFoundPostComment, DeleteComment, EditPost, GetSubsPosts, ResetPosts, EditUserInfo, GetAllUsersPosts, CommentPost, CommentFoundPost } from '../../../interfaces/Store/Actions/PostsAcions.interface';

export function makePost(data: any): MakePost {
    return {
        type: ActionTypes.MAKE_POST,
        data
    }
}

export function searchPosts(data: any): SearchPosts {
    return {
        type: ActionTypes.SEARCH_POSTS,
        data
    }
}

export function setUserPosts(data: any): SetUserPosts {
    return {
        type: ActionTypes.SET_USER_POSTS,
        data
    }
}

export function deletePost(data: any): DeletePost {
    return {
        type: ActionTypes.DELETE_POST,
        data
    }
}

export function deleteFoundPostComment(data: any): DeleteFoundPostComment {
    return {
        type: ActionTypes.DELETE_COMMENT_FOUND_POST,
        data
    }
}

export function deleteComment(data: any): DeleteComment {
    return {
        type: ActionTypes.DELETE_COMMENT,
        data
    }
}

export function editPost(data: any): EditPost {
    return {
        type: ActionTypes.EDIT_POST,
        data
    }
}

export function getSubsPosts(data: any): GetSubsPosts {
    return {
        type: ActionTypes.GET_SUB_USERS_POSTS,
        data
    }
}

export function resetPosts(): ResetPosts {
    return {
        type: ActionTypes.RESET_POSTS,
    }
}

export function editUserInfo(data: any): EditUserInfo {
    return {
        type: ActionTypes.EDIT_USER_INFO,
        data
    }
}

export function getAllUsersPosts(data: any): GetAllUsersPosts {
    return {
        type: ActionTypes.GET_USER_POSTS,
        data
    }
}

export function commentPost(data: any): CommentPost {
    return {
        type: ActionTypes.COMMENT_POST,
        data
    }
}

export function commentFoundPost(data: any): CommentFoundPost {
    return {
        type: ActionTypes.COMMENT_FOUND_POST,
        data
    }
}