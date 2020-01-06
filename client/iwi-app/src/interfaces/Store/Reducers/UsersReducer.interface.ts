import User from "../../User/User.interface";
import * as Immutable from "immutable";

export default interface UsersReducer extends Immutable.Map<string, any> {
    foundUser: User;
    foundUsers: Immutable.List<User[]>;
}