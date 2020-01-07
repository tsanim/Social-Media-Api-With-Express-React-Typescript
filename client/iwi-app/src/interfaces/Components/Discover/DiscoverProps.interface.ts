import { List } from "immutable";
import User from "../../User/User.interface";
import SearchData from "../../SearchData.interface";
import UsersService from "../../../services/UsersService";
import Store from "../../Store/Store.interface";
import { ConnectedProps, connect } from "react-redux";
import { AppThunkDispatch } from "../../../types";

const mapState = (state: Store) => {
    return {
        fetchStatus: state.systemReducer.get('fetchStatus'),
        foundUsers: state.usersReducer.get('foundUsers')
    }
}

const mapDispatch = (dispatch: AppThunkDispatch) => {
    return {
        search: (data: SearchData) => dispatch(UsersService.searchUser(data))
    }
}

export const connector = connect(mapState, mapDispatch); 

type PropsFromRedux = ConnectedProps<typeof connector>;

//assign props to new variable because in the future, eventualy, can assign new props, which are not from redux
export type DiscoverProps = PropsFromRedux;
