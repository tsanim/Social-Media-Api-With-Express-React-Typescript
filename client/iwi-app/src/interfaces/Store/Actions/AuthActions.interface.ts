import AuthActions from "../../../store/actions/authActions/actionTypes";

export interface LoginUser {
    type: typeof AuthActions.LOGIN_USER;
    data: any
}

export interface SetCurrentUser {
    type: typeof AuthActions.SET_CURRENT_USER;
    data: any;
}

export interface FollowUser {
    type: typeof AuthActions.FOLLOW_USER;
    data: any;
}

export interface UnfollowUser {
    type: typeof AuthActions.UNFOLLOW_USER;
    data: any;
}

export interface EditUserInfo {
    type: typeof AuthActions.EDIT_USER_INFO;
    data: any;
}

export interface Logout {
    type: typeof AuthActions.LOGOUT
}
