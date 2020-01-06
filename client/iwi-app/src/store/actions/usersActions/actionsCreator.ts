import ActionTypes from './actionTypes';
import { SearchUser, GetUserData, FollowUser, UnfollowUser } from '../../../interfaces/Store/Actions/UsersActions.interface';

export function followUser(data: any): FollowUser {
    return {
        type: ActionTypes.FOLLOW_USER,
        data
    }
}

export function searchUser(data: any): SearchUser {
    return {
        type: ActionTypes.SEARCH_USER,
        data
    }
}

export function unfollowUser(data: any): UnfollowUser {
    return {
        type: ActionTypes.UNFOLLOW_USER,
        data
    }
}

export function getUserData(data: any): GetUserData {
    return {
        type: ActionTypes.GET_USER_DATA,
        data
    }
}