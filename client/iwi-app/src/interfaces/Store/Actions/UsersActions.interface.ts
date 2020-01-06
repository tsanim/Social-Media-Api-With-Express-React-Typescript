import UsersTypes from "../../../store/actions/usersActions/actionTypes";

export interface FollowUser {
    type: typeof UsersTypes.FOLLOW_USER;
    data: any;
}

export interface SearchUser {
    type: typeof UsersTypes.SEARCH_USER;
    data: any;
}

export interface UnfollowUser {
    type: typeof UsersTypes.UNFOLLOW_USER;
    data: any;
}

export interface GetUserData {
    type: typeof UsersTypes.GET_USER_DATA;
    data: any;
}