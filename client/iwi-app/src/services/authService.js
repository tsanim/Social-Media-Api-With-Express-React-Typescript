import * as authActions from '../store/actions/authActions/actionsCreator';
import * as errorsActions from '../store/actions/errorsActions/actionsCreator';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';
import URI from '../config/config';

import httpRequest from '../utils/httpRequest';

export function registerUser(userData) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const onError = (errors) => {
            dispatch(errorsActions.fetchError(errors));
        };

        const optionsReq = {
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

export function loginUser(userData) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());
        
        const onError = (errors) => {
            dispatch(errorsActions.fetchError(errors));
        };

        const optionsReq = {
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

export function setCurrentUser(userId) {
    return (dispatch) => {
        const optionsReq = {
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