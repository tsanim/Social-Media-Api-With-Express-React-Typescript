import { useState } from 'react';
import UseForms from '../interfaces/UseForms.interface';

function useForms(callback: () => void): UseForms {
    //init useState
    const [inputs, setInputs] = useState({});

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        callback();

        setInputs(inputs => ({}));
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
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