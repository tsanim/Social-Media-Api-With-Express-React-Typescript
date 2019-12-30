import React from 'react';
import Loader from '../Loader/Loader';

export default function WithLoader(WrappedComponent) {
    return (props) => {
        return (
            props.fetchStatus > 0
                ? <Loader />
                : <WrappedComponent {...props} />
        )
    }
}