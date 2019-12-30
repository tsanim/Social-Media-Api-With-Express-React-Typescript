import * as actionTypes from './actionTypes';

export function followUser(data) {
    return {
        type: actionTypes.FOLLOW_USER,
        data
    }
}

export function searchUser(data) {
    return {
        type: actionTypes.SEARCH_USER,
        data
    }
}

export function unfollowUser(data) {
    return {
        type: actionTypes.UNFOLLOW_USER,
        data
    }
}

export function getUserData(data) {
    return {
        type: actionTypes.GET_USER_DATA,
        data
    }
}