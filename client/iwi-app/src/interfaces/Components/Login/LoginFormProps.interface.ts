import { LoginUser } from "../../User/AuthUser.interface";
import Store from "../../Store/Store.interface";
import AuthService from "../../../services/AuthService";
import { resetErrors } from "../../../store/actions/errorsActions/actionsCreator";
import { ConnectedProps, connect } from "react-redux";

const mapState = (state: Store) => {
    return {
        errors: state.errorsReducer
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        loginUser: (data: LoginUser) => dispatch(AuthService.loginUser(data)),
        resetErrors: () => dispatch(resetErrors())
    }
}

export const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

export type LoginFormProps = PropsFromRedux & {
    createSnackbar: (data: any) => void
};