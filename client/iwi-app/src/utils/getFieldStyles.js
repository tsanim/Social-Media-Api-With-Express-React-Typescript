import { getIn } from 'formik';

/*
    getFieldStyles is made to generate field styles for a certain field
*/

export default function getFieldStyles(errors, fieldName) {
    if (getIn(errors, fieldName)) {
        return {
            boxShadow: '0 8px 6px -6px red',
            border: '1px solid red'
        }
    }
}
