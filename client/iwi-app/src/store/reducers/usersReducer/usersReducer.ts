import ActionTypes from '../../actions/usersActions/actionTypes';
import { fromJS } from 'immutable';
import { UsersAction } from '../../../types';
import UsersReducer from '../../../interfaces/Store/Reducers/UsersReducer.interface';

export const initState: UsersReducer = fromJS({
    foundUser: {},
    foundUsers: []
})

export default function user(oldState = initState, action: UsersAction) {
    switch (action.type) {
        case ActionTypes.FOLLOW_USER:
        case ActionTypes.UNFOLLOW_USER:
        case ActionTypes.GET_USER_DATA:
            return oldState.set('foundUser', fromJS(action.data));
        case ActionTypes.SEARCH_USER:
            return oldState.set('foundUsers', fromJS(action.data));
        default:
            return oldState;
    }
}