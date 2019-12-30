import * as actionsTypes from './actionTypes';

export function beginFetch() {
    return {
        type: actionsTypes.FETCH_BEGIN
    }
}

export function fetchData() {
    return {
        type: actionsTypes.FETCH_DATA
    }
}

export function errorFetch() {
    return {
        type: actionsTypes.FETCH_ERROR
    }
}