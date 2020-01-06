import ErrorsActionTypes from '../../actions/errorsActions/actionTypes';
import * as Immutable from 'immutable';
import { ErrorsAction } from '../../../types';

export const initState: Immutable.List<any> = Immutable.fromJS([]);

export function setErrorsArray(oldState: Immutable.List<any>, data: any): Immutable.List<Error> {
    //chek if dispatched data is a single error or is array of errors
    if (Immutable.List.isList(data)) {
        return data;
    } else {
        return oldState.push(data);
    }
}

export default function errors(oldState = initState, action: ErrorsAction): Immutable.List<any> {
    switch (action.type) {
        case ErrorsActionTypes.ERROR:
            return setErrorsArray(oldState, Immutable.fromJS(action.data));
        case ErrorsActionTypes.RESET_ERRORS:
            return initState;
        default:
            return oldState;
    }
}