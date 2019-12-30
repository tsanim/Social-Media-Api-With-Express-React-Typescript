import * as userPostActions from '../store/actions/postsAtions/actionsCreator';
import * as fetchStatusActions from '../store/actions/fetchStatusActions/actionsCreator';
import URI from '../config/config';

import httpRequest from '../utils/httpRequest';

export function fetchCommentsLikes(commentId, onSuccess) {
    const options = {
        method: 'get',
        url: `${URI}/feed/comments/likes/${commentId}`,
        headers: {
            'Content-Type': 'application/json'
        },
        onSuccess,
        onError: (error) => {
            console.log(error);
        }
    }

    return httpRequest(options);
}

export function makeComment(commentData) {
    return (dispatch) => {
        //init options for request
        const optionsReq = {
            method: 'post',
            url: `${URI}/feed/comments/create`,
            data: commentData,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
                dispatch(userPostActions.commentPost(data.post));
                dispatch(userPostActions.commentFoundPost(data.post));
            }
        }

        return httpRequest(optionsReq);
    }
}

export function likeComment(commentId) {
    return (dispatch) => {
        const optionsReq = {
            method: 'put',
            url: `${URI}/feed/comments/like/${commentId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            }
        }

        return httpRequest(optionsReq);
    }
}


export function dislikeComment(commentId) {
    return (dispatch) => {
        const optionsReq = {
            method: 'put',
            url: `${URI}/feed/comments/dislike/${commentId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            }
        }

        return httpRequest(optionsReq);
    }
}

export function deleteComment(commentId) {
    return (dispatch) => {
        const optionsReq = {
            method: 'delete',
            url: `${URI}/feed/comments/delete/${commentId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Api ' + localStorage.getItem('token')
            },
            onSuccess: (data) => {
                dispatch(userPostActions.deleteComment(data.post));
                dispatch(userPostActions.deleteFoundPostComment(data.post));
            }
        }

        return httpRequest(optionsReq);
    }
}


