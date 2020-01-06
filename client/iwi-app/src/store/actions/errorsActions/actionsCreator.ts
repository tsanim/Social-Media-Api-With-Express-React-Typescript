import ActionTypes from './actionTypes';

export interface FetchError {
    type: ActionTypes.ERROR,
    data: any
}

export interface ResetErrors {
    type: ActionTypes.RESET_ERRORS,
}

export function fetchError(data: any): FetchError {
    return {
        type: ActionTypes.ERROR,
        data
    }
}

export function resetErrors(): ResetErrors {
    return {
        type: ActionTypes.RESET_ERRORS,
    }
}