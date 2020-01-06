import { RouteComponentProps } from "react-router-dom";
import Store from "../../Store/Store.interface";
import { connect, ConnectedProps } from "react-redux";

const mapState = (state: Store) => {
    return {
        currentUser: state.systemReducer.get('currentUser')
    }
}

export const connector = connect(mapState);

type ChatPropsFromRedux = ConnectedProps<typeof connector>;

export type ChatProps = ChatPropsFromRedux & {
    createSnackbar: (data: any) => void
} & RouteComponentProps<{}>;