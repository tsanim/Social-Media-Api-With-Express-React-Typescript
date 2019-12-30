import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import { wrapComponent } from 'react-snackbar-alert';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import getFieldStyles from '../../utils/getFieldStyles';

const validationSchema = Yup.object().shape({
    oldPassword: Yup.string()
        .required('Required'),
    newPassword: Yup.string()
        .matches(/^.*(?=.{6,})(?=.*[a-zA-Z])[a-zA-Z0-9]+$/, 'Password must contain at least one letter and at least one digit!')
        .min(8, 'Password must be at least 8 digits')
        .required('Required'),
});

function ChangePasswordForm({ changePasswordHandler, createSnackbar, errors: serverErrors, resetErrorsHandler }) {
    const handleSubmit = (form) => {
        changePasswordHandler(form);

        createSnackbar({
            message: 'Password is changed!',
            timeout: 3000,
        });

        //clear all errors 
        resetErrorsHandler();
    }

    //clear all errors after component unmount, so the same errors not showing up on another component
    useEffect(() => {
        return () => {
            resetErrorsHandler();
        }
    }, [resetErrorsHandler]);

    return (
        <Formik
            onSubmit={handleSubmit}
            initialValues={{
                oldPassword: '',
                newPassword: ''
            }}
            validationSchema={validationSchema}
        >
            {
                ({ errors }) => {
                    return (
                        <Form className="editForm">
                            {
                                (serverErrors.length > 0 && (<p className="error">{serverErrors[serverErrors.length - 1].message}</p>))
                            }
                            <span>
                                <FontAwesomeIcon icon={faKey} />
                                <Field
                                    type="password"
                                    name="oldPassword"
                                    placeholder="Old password..."
                                    style={getFieldStyles(errors, 'oldPassword')}
                                />
                                <ErrorMessage className="error-message" name="oldPassword" component="div" />
                            </span>
                            <span>
                                <FontAwesomeIcon icon={faLock} />
                                <Field
                                    type="password"
                                    name="newPassword"
                                    placeholder="New password..."
                                    style={getFieldStyles(errors, 'newPassword')}
                                />
                                <ErrorMessage className="error-message" name="newPassword" component="div" />
                            </span>
                            <input type="submit" value="CHANGE" />
                        </Form>
                    )
                }
            }
        </Formik>

    )
}


ChangePasswordForm.propTypes = {
    changePasswordHandler: PropTypes.func,
    createSnackbar: PropTypes.func,
    errors: PropTypes.array,
    resetErrorsHandler: PropTypes.func
}

export default wrapComponent(ChangePasswordForm);