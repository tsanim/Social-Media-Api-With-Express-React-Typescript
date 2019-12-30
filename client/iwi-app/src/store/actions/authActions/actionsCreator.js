import * as actionTypes from './actionTypes';

export function loginUser(data) {
    return {
        type: actionTypes.LOGIN_USER,
        data
    }
}

export function setCurrentUser(data) {
    return {
        type: actionTypes.SET_CURRENT_USER,
        data
    }
}

export function followUser(data) {
    return {
        type: actionTypes.FOLLOW_USER,
        data
    }
}

export function editUserInfo(data) {
    return {
        type: actionTypes.EDIT_USER_INFO,
        data
    }
}

export function unfollowUser(data) {
    return {
        type: actionTypes.UNFOLLOW_USER,
        data
    }
}

export function logout() {
    return {
        type: actionTypes.LOGOUT,
    }
}