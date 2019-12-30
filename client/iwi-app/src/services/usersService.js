import * as userActions from '../store/actions/usersActions/actionsCreator';
import * as authActions from '../store/actions/authActions/actionsCreator';
import * as userPostsActions from '../store/actions/postsAtions/actionsCreator';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';
import * as errorsActions from '../store/actions/errorsActions/actionsCreator';
import URI from '../config/config';

import httpRequest from '../utils/httpRequest';

export function searchUser({ searchText }) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
            method: 'get',
            url: `${URI}/user/search?searchText=${searchText}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
                dispatch(userActions.searchUser(data.foundUsers));
            }
        }

        return httpRequest(optionsReq, dispatch);
    }
}

export function getUser(userId) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
            method: 'get',
            url: `${URI}/user/info/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
                dispatch(userActions.getUserData(data.user));
                dispatch(userPostsActions.setUserPosts(data.user.posts));
            }
        }

        return httpRequest(optionsReq, dispatch);
    }
}

export function followUser(userId) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
            method: 'put',
            url: `${URI}/user/follow/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
                dispatch(authActions.followUser(data.me));
                dispatch(userActions.followUser(data.user));
            }
        }

        return httpRequest(optionsReq, dispatch);
    }
}

export function unfollowUser(userId) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
            method: 'put',
            url: `${URI}/user/unfollow/${userId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
                dispatch(authActions.unfollowUser(data.me));
                dispatch(userActions.unfollowUser(data.user));
            }
        }

        return httpRequest(optionsReq, dispatch);
    }
}

export function editUserInfo(userData) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
            method: 'put',
            url: `${URI}/user/edit`,
            data: userData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
                localStorage.setItem('username', data.user.username);
                dispatch(authActions.editUserInfo(data.user));
                dispatch(userPostsActions.editUserInfo(data.user.posts));
            }
        }

        return httpRequest(optionsReq, dispatch);
    }
}

export function changeUserPic(userPic) {
    return async (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
            method: 'put',
            url: `${URI}/user/changePic`,
            data: userPic,
            headers: {
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
                dispatch(authActions.editUserInfo(data.user));
                dispatch(userPostsActions.editUserInfo(data.user.posts));
            }
        }

        return httpRequest(optionsReq, dispatch);
    }
}

export function changePassword(passData) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
            method: 'put',
            url: `${URI}/user/changePassword`,
            data: passData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
            },
            onError: (error) => {
                dispatch(errorsActions.fetchError(error));
                dispatch(fetchStatusActions.errorFetch());
            }
        }

        return httpRequest(optionsReq, dispatch);
    }
}