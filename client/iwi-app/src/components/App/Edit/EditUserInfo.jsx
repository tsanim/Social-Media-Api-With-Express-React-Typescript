import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditUserInfoForm from '../../Forms/EditUserInfoForm';
import ChangePasswordForm from '../../Forms/ChangePasswordForm';
import EditProfilePicForm from '../../Forms/EditProfilePicForm';
import { changePassword, changeUserPic, editUserInfo } from '../../../services/usersService'
import { resetErrors } from '../../../store/actions/errorsActions/actionsCreator';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';

class EditUserInfo extends Component {
    render() {
        return (
            <main>
                <div className="editUserInfo">
                    <EditProfilePicForm
                        imageId={this.props.currUser.get('imageId')}
                        changeProfilePicHandler={this.props.changeProfilePic}
                        resetErrorsHandler={this.props.resetErrors}
                        errors={this.props.errors.toJS()}
                    />
                    <h3>Change your personal information</h3>
                    <EditUserInfoForm
                        editUserInfoHandler={this.props.editUserInformation}
                        resetErrorsHandler={this.props.resetErrors}
                        errors={this.props.errors.toJS()}
                    />
                    <h3>Change your password</h3>
                    <ChangePasswordForm
                        changePasswordHandler={this.props.changePass}
                        resetErrorsHandler={this.props.resetErrors}
                        errors={this.props.errors.toJS()}
                    />
                </div>
            </main>
        )
    }

}

function mapStateToProps(state) {
    return {
        currUser: state.systemReducer.get('currentUser'),
        errors: state.errorsReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        changePass: (data) => dispatch(changePassword(data)),
        changeProfilePic: (data) => dispatch(changeUserPic(data)),
        editUserInformation: (data) => dispatch(editUserInfo(data)),
        resetErrors: () => dispatch(resetErrors()),
    }
}

EditUserInfo.propTypes = {
    changePass: PropTypes.func,
    changeProfilePic: PropTypes.func,
    editUserInformation: PropTypes.func,
    resetErrors: PropTypes.func,
    errors: PropTypes.instanceOf(List),
    currUser: PropTypes.instanceOf(Map)
}

export default connect(mapStateToProps, mapDispatchToProps)(EditUserInfo);