import React from 'react';
import { wrapComponent } from 'react-snackbar-alert';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import getFieldStyles from '../../utils/getFieldStyles';
import EditUserInfoFormProps from '../../interfaces/Components/Forms/EditUserInfoFormProps.interface';
import { EditUserInformation } from '../../interfaces/Components/EditUserInformation/EditUserInfoProps.interface';

const initEditInfoState = {
    form: {
        username: '',
        firstName: '',
        lastName: '',
    }
}

const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(3, 'Username must be at least 3 symbols!'),
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 symbols!'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 symbols!'),
});

export function FormikEditForm({ errors }: any) {
    return (
        <Form className="editForm">
            <span>
                <Field
                    type="text"
                    name="username"
                    placeholder="Username..."
                    id="username"
                    style={getFieldStyles(errors, 'username')}
                />
                <ErrorMessage className="error-message" name="username" component="div" />
            </span>
            <span>
                <Field
                    type="text"
                    name="firstName"
                    placeholder="First Name..."
                    id="fistName"
                    style={getFieldStyles(errors, 'firstName')}
                />
                <ErrorMessage className="error-message" name="firstName" component="div" />
            </span>
            <span>
                <Field
                    type="text"
                    name="lastName"
                    placeholder="Last Name..."
                    id="lastName"
                    style={getFieldStyles(errors, 'lastName')}
                />
                <ErrorMessage className="error-message" name="lastName" component="div" />
            </span>
            <input type="submit" value="EDIT" />
        </Form>
    )
}

export function EditUserInfoForm({ editUserInfoHandler, createSnackbar }: EditUserInfoFormProps) {
    const handleSubmit = (form: EditUserInformation) => {
        
        editUserInfoHandler(form);

        createSnackbar({
            message: 'User info succesfully updated!',
            timeout: 3000,
        });
    }

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={initEditInfoState}
            validationSchema={validationSchema}

        >
            { FormikEditForm }
        </Formik>
    )
}

EditUserInfoForm.propTypes = {
    editUserInfoHandler: PropTypes.func,
    createSnackbar: PropTypes.func,
}

export default wrapComponent(EditUserInfoForm);