import * as userPostActions from '../store/actions/postsAtions/actionsCreator';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';

import URI from '../config/config';

import httpRequest from '../utils/httpRequest';
import PostData from '../interfaces/Feed/PostData.interface';
import RequestOptions from '../interfaces/RequestOptions.interface';
import SearchData from '../interfaces/SearchData.interface';

export default class PostsService {
    static uploadPost(postData: PostData) {
        return (dispatch: any) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
                method: 'post',
                url: `${URI}/feed/posts/create`,
                data: postData,
                headers: {
                    'Authorization': 'Api ' + localStorage.getItem('token')
                },
                onSuccess: (data) => {
                    dispatch(userPostActions.makePost(data.post));
                }
            }
    
            return httpRequest(optionsReq, dispatch);
        }
    }
    
    static getUserPosts(userId: string) {
        return (dispatch: any) => {
            dispatch(fetchStatusActions.beginFetch());
            
            const optionsReq: RequestOptions = {
                method: 'get',
                url: `${URI}/feed/posts/${userId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                },
                onSuccess: (data) => {
                    dispatch(userPostActions.getAllUsersPosts(data.posts));
                }
            }
    
            return  httpRequest(optionsReq, dispatch);
        }
    }
    
    static getAllSubsPosts() {
        return (dispatch: any) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
                method: 'get',
                url: `${URI}/feed/posts`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                },
                onSuccess: (data) => {
                    dispatch(userPostActions.getSubsPosts(data.posts));
                }
            }
    
            return httpRequest(optionsReq, dispatch);
        }
    }
    
    static searchPosts({ searchText }: SearchData) {
        return (dispatch: any) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
                method: 'get',
                url: `${URI}/feed/searchPosts?searchText=${searchText}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                },
                onSuccess: (data) => {
                    dispatch(userPostActions.searchPosts(data.foundPosts));
                }
            }
    
            return httpRequest(optionsReq, dispatch);
        }
    }
    
    static likePost(postId: string) {
        return (dispatch: any) => {
            const optionsReq: RequestOptions = {
                method: 'put',
                url: `${URI}/feed/posts/like/${postId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                }
            }
    
            return httpRequest(optionsReq, dispatch);
        }
    }
    
    static dislikePost(postId: string) {
        return (dispatch: any) => {
            const optionsReq = {
                method: 'put',
                url: `${URI}/feed/posts/dislike/${postId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                }
            }
    
            return httpRequest(optionsReq, dispatch);
        }
    }
    
    static deletePost(postId: string) {
        return (dispatch: any) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
                method: 'delete',
                url: `${URI}/feed/posts/${postId}`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                },
                onSuccess: (data) => {
                    dispatch(userPostActions.deletePost(data.posts));
                }
            }
    
            return httpRequest(optionsReq, dispatch);
        }
    }
    
    static editPost(postData: PostData, postId: string) {
        return (dispatch: any) => {
            dispatch(fetchStatusActions.beginFetch());
    
            const optionsReq: RequestOptions = {
                method: 'put',
                url: `${URI}/feed/posts/edit/${postId}`,
                data: postData,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Api ' + localStorage.getItem('token')
                },
                onSuccess: (data) => {
                    dispatch(userPostActions.editPost(data.post));
                }
            }
    
            return httpRequest(optionsReq, dispatch);
        }
    }
}
