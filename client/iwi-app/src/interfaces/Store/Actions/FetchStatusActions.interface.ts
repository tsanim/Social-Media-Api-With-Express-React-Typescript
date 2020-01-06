import FetchStatusTypes from "../../../store/actions/fetchStatusActions/actionTypes";

export interface BeginFetch {
    type: typeof FetchStatusTypes.FETCH_BEGIN;
}

export interface FetchData {
    type: typeof FetchStatusTypes.FETCH_DATA;
}

export interface ErrorFetch {
    type: typeof FetchStatusTypes.FETCH_ERROR;
}