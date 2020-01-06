import * as authActions from '../store/actions/authActions/actionsCreator';
import * as errorsActions from '../store/actions/errorsActions/actionsCreator';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';
import URI from '../config/config';
import * as AuthUser from '../interfaces/User/AuthUser.interface';

import httpRequest from '../utils/httpRequest';
import RequestOptions from '../interfaces/RequestOptions.interface';

export default class AuthService {
    static registerUser(userData: AuthUser.RegisterUser) {
        return (dispatch: any): Promise<any> => {
            dispatch(fetchStatusActions.beginFetch());

            const onError = (errors: any) => {
                dispatch(errorsActions.fetchError(errors));
            };

            const optionsReq: RequestOptions = {
                method: 'post',
                url: `${URI}/auth/signup`,
                data: userData,
                headers: {
                    'Content-Type': 'application/json',
                },
                onError
            }

            return httpRequest(optionsReq, dispatch);
        }
    }

    static loginUser(userData: AuthUser.LoginUser) {
        return (dispatch: any): Promise<any> => {
            dispatch(fetchStatusActions.beginFetch());

            const onError = (errors: any) => {
                dispatch(errorsActions.fetchError(errors));
            };

            const optionsReq: RequestOptions = {
                method: 'post',
                url: `${URI}/auth/signin`,
                data: userData,
                headers: {
                    'Content-Type': 'application/json',
                },
                onSuccess: (data) => {
                    const { token, user } = data;

                    //set some of user info to local storage
                    localStorage.setItem('username', user.username);
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', user._id);
                    localStorage.setItem('role', user.roles);
                    dispatch(authActions.loginUser(user));
                },
                onError
            }

            return httpRequest(optionsReq, dispatch);
        }
    }

    static setCurrentUser(userId: string) {
        return (dispatch: any): Promise<any> => {
            const optionsReq: RequestOptions = {
                method: 'get',
                url: `${URI}/user/info/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                },
                onSuccess: (data) => {
                    dispatch(authActions.setCurrentUser(data.user));
                }
            };

            return httpRequest(optionsReq);
        }
    }
}
