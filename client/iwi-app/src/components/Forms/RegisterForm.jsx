import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserAlt, faUserCircle, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser, loginUser } from '../../services/authService';
import { resetErrors } from '../../store/actions/errorsActions/actionsCreator';
import { wrapComponent } from 'react-snackbar-alert';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import getFieldStyles from '../../utils/getFieldStyles';

const initRegisterState = {
    form: {
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        password: '',
    }
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    username: Yup.string()
        .min(3, 'Username must be at least 3 symbols!')
        .required('Required'),
    firstName: Yup.string()
        .min(2, 'First name must be at least 2 symbols!')
        .required('Required'),
    lastName: Yup.string()
        .min(2, 'Last name must be at least 2 symbols!')
        .required('Required'),
    password: Yup.string()
        .matches(/^.*(?=.{6,})(?=.*[a-zA-Z])[a-zA-Z0-9]+$/, 'Password must contain at least one letter and at least one digit!')
        .min(8, 'Password must be at least 8 digits')
        .required('Required'),
});

class RegisterForm extends Component {
    state = initRegisterState;

    handleSubmit = (form) => {
        this.props.register(form)
            .then(() => {
                return this.props.loginUser({ email: form.email, password: form.password });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        return (
            <main>
                <Formik
                    onSubmit={this.handleSubmit}
                    initialValues={initRegisterState.form}
                    validationSchema={validationSchema}
                >

                    {
                        ({ errors }) => {
                            return (
                                <Form id="registerForm">
                                    <h1>SIGN UP</h1>
                                    {
                                        (this.props.errors.size > 0 ? (<p className="error">{this.props.errors.getIn(['0', 'message']) ? this.props.errors.getIn(['0', 'message']) : this.props.errors.getIn(['0', 'msg'])}</p>) : null)
                                    }
                                    <span>
                                        <FontAwesomeIcon icon={faUserCircle} />
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
                                        <FontAwesomeIcon icon={faUser} />
                                        <Field
                                            type="text"
                                            name="firstName"
                                            placeholder="First Name..."
                                            id="firstName"
                                            style={getFieldStyles(errors, 'firstName')}
                                        />
                                        <ErrorMessage className="error-message" name="firstName" component="div" />
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faUserAlt} />
                                        <Field
                                            type="text"
                                            name="lastName"
                                            placeholder="Last Name..."
                                            id="lastName"
                                            style={getFieldStyles(errors, 'lastName')}
                                        />
                                        <ErrorMessage className="error-message" name="lastName" component="div" />
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Email..."
                                            id="email"
                                            style={getFieldStyles(errors, 'email')}
                                        />
                                        <ErrorMessage className="error-message" name="email" component="div" />
                                    </span>
                                    <span>
                                        <FontAwesomeIcon icon={faKey} />
                                        <Field
                                            type="password"
                                            name="password"
                                            placeholder="Password..."
                                            id="pass"
                                            style={getFieldStyles(errors, 'password')}
                                        />
                                        <ErrorMessage className="error-message" name="password" component="div" />
                                    </span>
                                    <input type="submit" value="SIGN UP" />
                                </Form>
                            )
                        }
                    }

                </Formik>
                <div className="message">
                    <span>You are already sign in?</span> <Link to="/signin">SIGN IN</Link>
                </div>
            </main>
        )
    }

    //clear all errors after component unmount, so the same errors not showing up on another component        
    componentWillUnmount() {
        this.props.resetErrors();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        register: (data) => dispatch(registerUser(data)),
        resetErrors: () => dispatch(resetErrors()),
        loginUser: (data) => dispatch(loginUser(data))
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errorsReducer
    }
}

RegisterForm.propTypes = {
    register: PropTypes.func,
    resetErrors: PropTypes.func,
    createSnackbar: PropTypes.func,
    errors: PropTypes.instanceOf(List),
}


export default connect(mapStateToProps, mapDispatchToProps)(wrapComponent(RegisterForm));