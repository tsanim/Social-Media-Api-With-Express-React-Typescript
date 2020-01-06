import ActionsTypes from './actionTypes';
import { BeginFetch, FetchData, ErrorFetch } from '../../../interfaces/Store/Actions/FetchStatusActions.interface';

export function beginFetch(): BeginFetch {
    return {
        type: ActionsTypes.FETCH_BEGIN
    }
}

export function fetchData(): FetchData {
    return {
        type: ActionsTypes.FETCH_DATA
    }
}

export function errorFetch(): ErrorFetch {
    return {
        type: ActionsTypes.FETCH_ERROR
    }
}