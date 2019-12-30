import * as userPostActions from '../store/actions/postsAtions/actionsCreator';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';

import URI from '../config/config';

import httpRequest from '../utils/httpRequest';

export function uploadPost(postData) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());
        const optionsReq = {
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

export function getUserPosts(userId) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());
        
        const optionsReq = {
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

export function getAllSubsPosts() {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
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

export function searchPosts({ searchText }) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());
        const optionsReq = {
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

export function likePost(postId) {
    return (dispatch) => {
        const optionsReq = {
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

export function dislikePost(postId) {
    return (dispatch) => {
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

export function deletePost(postId) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
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

export function editPost(postData, postId) {
    return (dispatch) => {
        dispatch(fetchStatusActions.beginFetch());

        const optionsReq = {
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