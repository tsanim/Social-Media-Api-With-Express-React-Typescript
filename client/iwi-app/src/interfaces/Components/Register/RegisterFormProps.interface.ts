import Store from "../../Store/Store.interface";
import { RegisterUser, LoginUser } from "../../User/AuthUser.interface";
import { connect, ConnectedProps } from "react-redux";
import AuthService from "../../../services/AuthService";
import { resetErrors } from "../../../store/actions/errorsActions/actionsCreator";
import { AppThunkDispatch } from "../../../types";

const mapState = (state: Store) => {
    return {
        errors: state.errorsReducer
    }
}


const mapDispatch = (dispatch: AppThunkDispatch) => {
    return {
        register: (data: RegisterUser) => dispatch(AuthService.registerUser(data)),
        resetErrors: () => dispatch(resetErrors()),
        loginUser: (data: LoginUser) => dispatch(AuthService.loginUser(data))
    }
}

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type RegisterFormProps = PropsFromRedux & {
    createSnackbar: (data: any) => void
};