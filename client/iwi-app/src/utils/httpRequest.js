import axiosRequest from './axiosRequest'
import fetchRequest from './fetchRequest';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';

/*
    httpRequest function is made to check is browser suppert certain API for fetching. 
    In the function can set some middle functions or configurations.  
*/


async function httpRequest(options, dispatch) {
    //check if fetch API is supported by the current browser (window object containt the fetch object)
    //on the other hand we return axios request
    const isOffline = window.navigator.onLine;
    const userOnSucc = options.onSuccess ? options.onSuccess : null; 
    const userOnErr =  options.onSuccess ? options.onError : null;

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