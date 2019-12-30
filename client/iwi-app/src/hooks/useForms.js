import { useState } from 'react';

function useForms(callback, isRegister) {
    //init useState
    const [inputs, setInputs] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        callback();

        //check is register form or not , to know if it needs to reset inputs or not
        if (isRegister === undefined && !isRegister) {
            setInputs(inputs => ({}))
        }
    }

    const handleChangeInput = (e) => {
        e.persist();
        
        setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
    }

    return {
        inputs,
        handleSubmit,
        handleChangeInput
    }
}

export default useForms;