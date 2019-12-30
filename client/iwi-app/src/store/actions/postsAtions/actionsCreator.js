import * as actionTypes from './actionTypes';

export function makePost(data) {
    return {
        type: actionTypes.MAKE_POST,
        data
    }
}

export function searchPosts(data) {
    return {
        type: actionTypes.SEARCH_POSTS,
        data
    }
}

export function setUserPosts(data) {
    return {
        type: actionTypes.SET_USER_POSTS,
        data
    }
}

export function deletePost(data) {
    return {
        type: actionTypes.DELETE_POST,
        data
    }
}

export function deleteFoundPostComment(data) {
    return {
        type: actionTypes.DELETE_COMMENT_FOUND_POST,
        data
    }
}

export function deleteComment(data) {
    return {
        type: actionTypes.DELETE_COMMENT,
        data
    }
}

export function editPost(data) {
    return {
        type: actionTypes.EDIT_POST,
        data
    }
}

export function getSubsPosts(data) {
    return {
        type: actionTypes.GET_SUB_USERS_POSTS,
        data
    }
}

export function resetPosts() {
    return {
        type: actionTypes.RESET_POSTS,
    }
}

export function editUserInfo(data) {
    return {
        type: actionTypes.EDIT_USER_INFO,
        data
    }
}

export function getAllUsersPosts(data) {
    return {
        type: actionTypes.GET_USER_POSTS,
        data
    }
}

export function commentPost(data) {
    return {
        type: actionTypes.COMMENT_POST,
        data
    }
}

export function commentFoundPost(data) {
    return {
        type: actionTypes.COMMENT_FOUND_POST,
        data
    }
}