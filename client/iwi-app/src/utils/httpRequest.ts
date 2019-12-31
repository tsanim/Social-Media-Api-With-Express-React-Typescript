import axiosRequest from './axiosRequest'
import fetchRequest from './fetchRequest';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';
import RequestOptions from '../interfaces/RequestOptions.interface';

/*
    httpRequest function is made to check is browser suppert certain API for fetching. 
    In the function can set some middle functions or configurations.  
*/


async function httpRequest(options: RequestOptions, dispatch?: any) {
    //check if fetch API is supported by the current browser (window object containt the fetch object)
    //on the other hand we return axios request
    const isOffline: boolean = window.navigator.onLine;
    const userOnSucc: (data: object) => void = options.onSuccess ? options.onSuccess : null; 
    const userOnErr: (error: object) => void =  options.onSuccess ? options.onError : null;

    options.onSuccess = (data) => {
        if (dispatch) {
            dispatch(fetchStatusActions.fetchData());
        }

        if (userOnSucc) {
            userOnSucc(data);
        }
    }

    options.onError = (data) => {
        if (dispatch) {
            dispatch(fetchStatusActions.errorFetch());
        }

        if (userOnErr) {
            userOnErr(data);
        }
    }

    if (window.fetch) {
        return fetchRequest(options, isOffline);
    } else {
        return axiosRequest(options, isOffline);
    }
}

export default httpRequest;