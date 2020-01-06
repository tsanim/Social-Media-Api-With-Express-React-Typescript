import User from "../../User/User.interface";
import * as Immutable from 'immutable';

export default interface SystemReducer extends Immutable.Map<string, any> {
    readonly currentUser: User;
    readonly connectionStatus: boolean;
    readonly fetchStatus: number;
}