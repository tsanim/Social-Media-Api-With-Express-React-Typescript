import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../services/authService';
import { wrapComponent } from 'react-snackbar-alert';
import { resetErrors } from '../../store/actions/errorsActions/actionsCreator';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import getFieldStyles from '../../utils/getFieldStyles';

const initLoginState = {
    form: {
        email: '',
        password: '',
    }
}

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 digits')
        .required('Required'),
});

class LoginForm extends Component {
    state = initLoginState;

    handleSubmit = async (form) => {
        await this.props.loginUser(form);
    }

    render() {
        return (
            <main>
                <Formik
                    onSubmit={this.handleSubmit}
                    initialValues={initLoginState.form}
                    validationSchema={validationSchema}
                >
                    {
                        ({ errors }) => {
                            return (
                                <Form id="loginForm">
                                    <h1>SIGN IN</h1>
                                    {
                                        (this.props.errors.size > 0 ? (<p className="error">{this.props.errors.getIn(['0', 'message']) ? this.props.errors.getIn(['0', 'message']) : this.props.errors.getIn(['0', 'msg'])}</p>) : null)
                                    }
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
                                            id="password"
                                            style={getFieldStyles(errors, 'password')}
                                        />
                                        <ErrorMessage className="error-message" name="password" component="div" />
                                    </span>
                                    <input type="submit" defaultValue="SIGN IN" />
                                </Form>
                            )
                        }
                    }
                </Formik>

                <div className="message">
                    <span>You are not signed up yet?</span> <Link to="/signup">SIGN UP</Link>
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
        loginUser: (data) => dispatch(loginUser(data)),
        resetErrors: () => dispatch(resetErrors())
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errorsReducer
    }
}

LoginForm.propTypes = {
    loginUser: PropTypes.func,
    resetErr: PropTypes.func,
    createSnackbar: PropTypes.func,
    errors: PropTypes.instanceOf(List),
}


export default connect(mapStateToProps, mapDispatchToProps)(wrapComponent(LoginForm));