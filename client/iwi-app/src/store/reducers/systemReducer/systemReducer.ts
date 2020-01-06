import AuthActions from '../../actions/authActions/actionTypes';
import ConnStatusTypes from '../../actions/connectionStatusActions/actionTypes';
import FetchStatusTypes from '../../actions/fetchStatusActions/actionTypes';

import { fromJS } from 'immutable';
import SystemReducer from '../../../interfaces/Store/Reducers/SystemReducer.interface';
import { SystemReducerAction } from '../../../types';

export const initState: SystemReducer = fromJS({
    currentUser: {},
    connectionStatus: true,
    fetchStatus: 0,
});

export default function system(oldState = initState, action: SystemReducerAction) {
    switch (action.type) {
        case AuthActions.LOGIN_USER:
        case AuthActions.SET_CURRENT_USER:
        case AuthActions.FOLLOW_USER:
        case AuthActions.UNFOLLOW_USER:
        case AuthActions.EDIT_USER_INFO:
            return oldState.set('currentUser', fromJS(action.data));
        case AuthActions.LOGOUT:
            localStorage.clear();
            return initState;
        case ConnStatusTypes.ONLINE:
            return oldState.set('connectionStatus', true);
        case ConnStatusTypes.OFFLINE:
            return oldState.set('connectionStatus', false);;
        case FetchStatusTypes.FETCH_BEGIN:
            return oldState.set('fetchStatus', oldState.get('fetchStatus') + 1);
        case FetchStatusTypes.FETCH_ERROR:
            return oldState.set('fetchStatus', oldState.get('fetchStatus') - 1);
        case FetchStatusTypes.FETCH_DATA:
            return oldState.set('fetchStatus', oldState.get('fetchStatus') - 1);
        default:
            return oldState;
    }
}