import * as userActions from '../store/actions/usersActions/actionsCreator';
import * as authActions from '../store/actions/authActions/actionsCreator';
import * as userPostsActions from '../store/actions/postsAtions/actionsCreator';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';
import * as errorsActions from '../store/actions/errorsActions/actionsCreator';
import URI from '../config/config';

import httpRequest from '../utils/httpRequest';
import SearchData from '../interfaces/SearchData.interface';
import RequestOptions from '../interfaces/RequestOptions.interface';
import { EditUserInformation, ChangePassword } from '../interfaces/Components/EditUserInformation/EditUserInfoProps.interface';
import { AppDispatch } from '..';
import { ThunkResult } from '../types';

export default class UsersService {
    static searchUser({ searchText }: SearchData): ThunkResult<Promise<any>> {
        return (dispatch: AppDispatch) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
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
    
    static getUser(userId: string): ThunkResult<Promise<any>> {
        return (dispatch: AppDispatch) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
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
    
    static followUser(userId: string): ThunkResult<Promise<any>> {
        return (dispatch: AppDispatch) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
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
    
    static unfollowUser(userId: string): ThunkResult<Promise<any>> {
        return (dispatch: AppDispatch) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
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
    
    static editUserInfo(userData: EditUserInformation): ThunkResult<Promise<any>> {
        return (dispatch: AppDispatch) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
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
    
    static changeUserPic(userPic: { avatar: File }): ThunkResult<Promise<any>> {
        return async (dispatch: AppDispatch) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
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
    
    static changePassword(passData: ChangePassword): ThunkResult<Promise<any>> {
        return (dispatch: AppDispatch) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
                method: 'put',
                url: `${URI}/user/changePassword`,
                data: passData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                },
                onSuccess: () => {
                },
                onError: (error) => {
                    dispatch(errorsActions.fetchError(error));
                    dispatch(fetchStatusActions.errorFetch());
                }
            }
    
            return httpRequest(optionsReq, dispatch);
        }
    }
}
