/*
    fetchRequest function is made to send requests with FETCH API to the server.
*/

async function fetchRequest(options, isOffline) {
    try {
        if (!isOffline) {
            return options.onError({ message: 'Network error1' });
        }

        // check data if it is FormData object to know if we need to send application/json or multipart/form-data
        let body = options.data instanceof FormData ? options.data : JSON.stringify(options.data);

        const res = await fetch(options.url, {
            method: options.method,
            headers: options.headers,
            body,
        });

        const data = await res.json();

        if (data.error || data.errors) {
            return options.onError(data.error ? data : data.errors);
        }

        if (options.onSuccess) options.onSuccess(data);
    } catch (error) {
        options.onError(error)

        console.log(error);
    }
}

export default fetchRequest;