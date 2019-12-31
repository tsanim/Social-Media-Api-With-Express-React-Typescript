import axios, { Method } from 'axios';
import RequestOptions from '../interfaces/RequestOptions.interface';

/*
    axiosRequest function is made for send request to the server with axios API.
*/

async function axiosRequest(options: RequestOptions, isOffline: boolean) {
    try {
        if (!isOffline) {
            return options.onError({ message: 'Network error' });
        }
        
        const res = await axios({
            method: options.method as Method,
            url: options.url,
            data: options.data ? options.data : null,
            headers: options.headers
        });

        const { data } = res;

        if (options.onSuccess) options.onSuccess(data);
    } catch (error) {
        //if there is arrray with errors in data - return them like or then return single data error object
        if (error.response) {
            console.log('options');
            options.onError(error.response.data.errors ? error.response.data.errors : error.response.data)
            console.log(error.response);
        }

        console.log(error.response);
    }
}

export default axiosRequest;