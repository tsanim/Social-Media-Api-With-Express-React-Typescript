import { getIn } from 'formik';

/*
    getFieldStyles is made to generate field styles for a certain field
*/

interface FieldStyles {
    boxShadow: string,
    border: string,
}

export default function getFieldStyles(errors: object[], fieldName: string): FieldStyles {
    if (getIn(errors, fieldName)) {
        return {
            boxShadow: '0 8px 6px -6px red',
            border: '1px solid red'
        }
    }
}
