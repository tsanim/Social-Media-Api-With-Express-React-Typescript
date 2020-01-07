import * as userPostActions from '../store/actions/postsAtions/actionsCreator';
import URI from '../config/config';

import httpRequest from '../utils/httpRequest';
import RequestOptions from '../interfaces/RequestOptions.interface';
import CommentData from '../interfaces/Feed/CommentData.interface';
import { AppDispatch } from '..';
import { ThunkResult } from '../types';

export default class CommentsService {
    static fetchCommentsLikes(commentId: string, onSuccess: (data: any) => void): Promise<any> {
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
    
    static makeComment(commentData: CommentData): ThunkResult<Promise<any>> {
        return (dispatch: AppDispatch) => {
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
    
    static likeComment(commentId: string): ThunkResult<Promise<any>> {
        return () => {
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
    
    
    static dislikeComment(commentId: string): ThunkResult<Promise<any>> {
        return () => {
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
    
    static deleteComment(commentId: string): ThunkResult<Promise<any>> {
        return (dispatch: AppDispatch) => {
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
