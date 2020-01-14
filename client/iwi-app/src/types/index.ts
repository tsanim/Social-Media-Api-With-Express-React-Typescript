import { FetchError, ResetErrors } from "../store/actions/errorsActions/actionsCreator";
import { LoginUser, SetCurrentUser, FollowUser, UnfollowUser, EditUserInfo, Logout } from "../interfaces/Store/Actions/AuthActions.interface";
import { ErrorFetch, BeginFetch, FetchData } from "../interfaces/Store/Actions/FetchStatusActions.interface";
import { Online, Offline } from "../interfaces/Store/Actions/ConnStatusActions.interface";
import * as UsersActions from "../interfaces/Store/Actions/UsersActions.interface";
import * as PostsActions from "../interfaces/Store/Actions/PostsAcions.interface";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import Store from "../interfaces/Store/Store.interface";

export type ErrorsAction = FetchError | ResetErrors;
export type AuthActions = LoginUser | SetCurrentUser | FollowUser | UnfollowUser | EditUserInfo | Logout;
export type FetchStatusActions = BeginFetch | FetchData | ErrorFetch;
export type ConnectionStatusActions = Online | Offline;
export type SystemReducerAction = AuthActions | FetchStatusActions | ConnectionStatusActions;
export type UsersAction = UsersActions.FollowUser | UsersActions.GetUserData | UsersActions.SearchUser | UsersActions.UnfollowUser; 
export type PostsAction = PostsActions.MakePost | PostsActions.SearchPosts | PostsActions.SetUserPosts | PostsActions.DeletePost | PostsActions.DeleteFoundPostComment | PostsActions.DeleteComment | PostsActions.EditPost | PostsActions.GetSubsPosts | PostsActions.ResetPosts | PostsActions.EditUserInfo | PostsActions.GetAllUsersPosts | PostsActions.CommentPost | PostsActions.CommentFoundPost;
export type ThunkResult<R> = ThunkAction<R, Store, undefined, AnyAction>;
export type AppThunkDispatch = ThunkDispatch<Store, null, AnyAction>;