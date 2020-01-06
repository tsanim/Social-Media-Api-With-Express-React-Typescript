import AuthActions from './actionTypes';
import { SetCurrentUser, FollowUser, LoginUser, EditUserInfo, UnfollowUser, Logout } from '../../../interfaces/Store/Actions/AuthActions.interface';

export function loginUser(data: any): LoginUser {
    return {
        type: AuthActions.LOGIN_USER,
        data
    }
}

export function setCurrentUser(data: any): SetCurrentUser {
    return {
        type: AuthActions.SET_CURRENT_USER,
        data
    }
}

export function followUser(data: any): FollowUser {
    return {
        type: AuthActions.FOLLOW_USER,
        data
    }
}

export function editUserInfo(data: any): EditUserInfo {
    return {
        type: AuthActions.EDIT_USER_INFO,
        data
    }
}

export function unfollowUser(data: any): UnfollowUser {
    return {
        type: AuthActions.UNFOLLOW_USER,
        data
    }
}

export function logout(): Logout {
    return {
        type: AuthActions.LOGOUT,
    }
}