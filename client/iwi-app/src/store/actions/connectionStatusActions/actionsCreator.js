import * as actionTypes from './actionTypes';

export function online() {
    return {
        type: actionTypes.ONLINE,
    }
}

export function offline() {
    return {
        type: actionTypes.OFFLINE,
    }
}