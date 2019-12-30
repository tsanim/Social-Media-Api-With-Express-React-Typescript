import * as actionTypes from './actionTypes';

export function fetchError(data) {
    return {
        type: actionTypes.ERROR,
        data
    }
}

export function resetErrors() {
    return {
        type: actionTypes.RESET_ERRORS,
    }
}