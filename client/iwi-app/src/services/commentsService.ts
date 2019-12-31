import * as userPostActions from '../store/actions/postsAtions/actionsCreator';
import URI from '../config/config';

import httpRequest from '../utils/httpRequest';
import RequestOptions from '../interfaces/RequestOptions.interface';
import Comment from '../interfaces/Comment.interface';

export default class CommentsService {
    static fetchCommentsLikes(commentId: string, onSuccess: (data: any) => void) {
        const options: RequestOptions = {
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
    
    static makeComment(commentData: Comment) {
        return (dispatch: any) => {
            //init options for request
            const optionsReq: RequestOptions = {
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
    
    static likeComment(commentId: string) {
        return (dispatch: any) => {
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
    
    
    static dislikeComment(commentId: string) {
        return (dispatch: any) => {
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
    
    static deleteComment(commentId: string) {
        return (dispatch: any) => {
            const optionsReq: RequestOptions = {
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
}
