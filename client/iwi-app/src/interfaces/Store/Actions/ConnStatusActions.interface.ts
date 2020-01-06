import ActionTypes from "../../../store/actions/connectionStatusActions/actionTypes";

export interface Online {
    type: typeof ActionTypes.ONLINE;
}

export interface Offline {
    type: typeof ActionTypes.OFFLINE;
}