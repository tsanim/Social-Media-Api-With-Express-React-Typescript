import React, { Component } from 'react';
import EditUserInfoForm from '../../Forms/EditUserInfoForm';
import ChangePasswordForm from '../../Forms/ChangePasswordForm';
import EditProfilePicForm from '../../Forms/EditProfilePicForm';
import PropTypes from 'prop-types';
import { List, Map } from 'immutable';
import { EditUserInfoProps, connector } from '../../../interfaces/Components/EditUserInformation/EditUserInfoProps.interface';

class EditUserInfo extends Component<EditUserInfoProps> {
    render() {
        return (
            <main>
                <div className="editUserInfo">
                    <EditProfilePicForm
                        imageId={this.props.currentUser.get('imageId')}
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

// EditUserInfo.propTypes = {
//     changePass: PropTypes.func,
//     changeProfilePic: PropTypes.func,
//     editUserInformation: PropTypes.func,
//     resetErrors: PropTypes.func,
//     errors: PropTypes.instanceOf(List),
//     currentUser: PropTypes.instanceOf(Map)
// }

export default connector(EditUserInfo);