import * as actionTypes from '../../actions/errorsActions/actionTypes';
import { List, fromJS } from 'immutable';

export const initState = fromJS([]);

export function setErrorsArray(oldState, data) {
    //chek if dispatched data is a single error or is array of errors
    if (List.isList(data)) {
        return data;
    } else {
        return oldState.push(data);
    }
}

export default function errors(oldState = initState, action) {
    switch (action.type) {
        case actionTypes.ERROR:
            return setErrorsArray(oldState, fromJS(action.data));
        case actionTypes.RESET_ERRORS:
            return initState;
        default:
            return oldState;
    }
}