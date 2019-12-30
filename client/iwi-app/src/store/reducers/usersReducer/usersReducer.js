import * as actionTypes from '../../actions/usersActions/actionTypes';
import { fromJS } from 'immutable';

export const initState = fromJS({
    foundUser: {},
    foundUsers: []
})

export default function user(oldState = initState, action) {
    switch (action.type) {
        case actionTypes.FOLLOW_USER:
        case actionTypes.UNFOLLOW_USER:
        case actionTypes.GET_USER_DATA:
            return oldState.set('foundUser', fromJS(action.data));
        case actionTypes.SEARCH_USER:
            return oldState.set('foundUsers', fromJS(action.data));
        default:
            return oldState;
    }
}