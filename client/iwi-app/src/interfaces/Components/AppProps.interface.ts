import { RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import Store from "../Store/Store.interface";
import { AppThunkDispatch } from "../../types";
import { logout, loginUser } from "../../store/actions/authActions/actionsCreator";
import { resetPosts } from "../../store/actions/postsAtions/actionsCreator";
import { online, offline } from "../../store/actions/connectionStatusActions/actionsCreator";
import AuthService from "../../services/AuthService";
import { PlainUser } from "../User/User.interface";

const mapState = (state: Store) => {
    return {
        currentUser: state.systemReducer.get('currentUser'),
        errors: state.errorsReducer,
        connectionStatus: state.systemReducer.get('connectionStatus')
    }
}

const mapDispatch = (dispatch: AppThunkDispatch) => {
    return {
        signout: () => dispatch(logout()),
        resetUserPosts: () => dispatch(resetPosts()),
        switchToOnline: () => dispatch(online()),
        switchToOffline: () => dispatch(offline()),
        loginUser: (user: PlainUser) => dispatch(loginUser(user)),
        setCurrentUser: (userId: string) => dispatch(AuthService.setCurrentUser(userId))
    }
}

export const connector = connect(mapState, mapDispatch);

type AppPropsFromRedux = ConnectedProps<typeof connector>;

export type AppProps = AppPropsFromRedux & {
    createSnackbar: (data: any) => void
};