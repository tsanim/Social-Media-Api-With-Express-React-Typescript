import SystemReducer from "./Reducers/SystemReducer.interface";
import * as Immutable from "immutable";
import UsersReducer from "./Reducers/UsersReducer.interface";
import PostsReducer from "./Reducers/PostsReducer.interface";

export default interface Store {
    systemReducer: SystemReducer,
    errorsReducer: Immutable.List<any>,
    usersReducer: UsersReducer,
    postsReducer: PostsReducer
}