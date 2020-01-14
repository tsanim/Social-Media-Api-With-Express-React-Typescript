import User from "../../User/User.interface";
import Store from "../../Store/Store.interface";
import UsersService from "../../../services/UsersService";
import { resetErrors } from "../../../store/actions/errorsActions/actionsCreator";
import { connect, ConnectedProps } from "react-redux";
import { AppThunkDispatch } from "../../../types";

export interface EditUserInformation {
    username?: string;
    firstName?: string;
    lastName?: string;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}

const mapState = (state: Store) => {
    return {
        currentUser: state.systemReducer.get('currentUser'),
        errors: state.errorsReducer
    }
}

const mapDispatch = (dispatch: AppThunkDispatch) => {
    return {
        changePass: (data: ChangePassword) => dispatch(UsersService.changePassword(data)),
        changeProfilePic: (data: { avatar: File }) => dispatch(UsersService.changeUserPic(data)),
        editUserInformation: (data: EditUserInformation) => dispatch(UsersService.editUserInfo(data)),
        resetErrors: () => dispatch(resetErrors()),
    }
}

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

//assign props to new variable because in the future, eventualy, can assign new props, which are not from redux
export type EditUserInfoProps = PropsFromRedux;