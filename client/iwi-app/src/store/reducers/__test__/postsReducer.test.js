import postsReducer, { initState, updatePost, deletePost, getAllPosts } from '../postsReducer/postsReducer';
import * as postsActionsTypes from '../../actions/postsAtions/actionTypes';
import { Map, fromJS } from 'immutable';

describe('Posts reducer', () => {
    it('should trigger initialize initial state', () => {
        expect(postsReducer(undefined, {})).toEqual(initState);
    });

    it('should trigger get and set users posts type', () => {
        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.GET_USER_POSTS,
            data: []
        })).toEqual(fromJS({
            posts: []
        }));

        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.GET_SUB_USERS_POSTS,
            data: []
        })).toEqual(fromJS({
            posts: []
        }));

        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.SET_USER_POSTS,
            data: []
        })).toEqual(fromJS({
            posts: []
        }));
    });

    it('should trigger update user posts type', () => {
        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.DELETE_COMMENT,
            data: []
        })).toEqual(fromJS({
            posts: []
        }));

        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.COMMENT_POST,
            data: []
        })).toEqual(fromJS({
            posts: []
        }));

        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.EDIT_POST,
            data: []
        })).toEqual(fromJS({
            posts: []
        }));
    });

    it('should trigger delete user post type', () => {
        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.DELETE_POST,
            data: []
        })).toEqual(fromJS({
            posts: []
        }));
    });

    it('should trigger make post type', () => {
        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.MAKE_POST,
            data: {}
        })).toEqual(fromJS({
            posts: [ {} ]
        }));
    });

    it('should trigger search posts type', () => {
        expect(postsReducer(fromJS({ foundPosts: [] }), {
            type: postsActionsTypes.SEARCH_POSTS,
            data: []
        })).toEqual(fromJS({
            foundPosts: []
        }));
    });

    it('should trigger comment found post type', () => {
        expect(postsReducer(fromJS({ foundPosts: [] }), {
            type: postsActionsTypes.COMMENT_FOUND_POST,
            data: []
        })).toEqual(fromJS({
            foundPosts: []
        }));
    });

    it('should trigger delete comment found post type', () => {
        expect(postsReducer(fromJS({ foundPosts: [] }), {
            type: postsActionsTypes.DELETE_COMMENT_FOUND_POST,
            data: []
        })).toEqual(fromJS({
            foundPosts: []
        }));
    });

    it('should trigger reset posts type', () => {
        expect(postsReducer(fromJS({ posts: [] }), {
            type: postsActionsTypes.RESET_POSTS,
        })).toEqual(initState);
    });

    it('updatePost - should return new state with new post in posts array', () => {
        const oldState = fromJS({ posts: [{ _id: '123', text: 'text' }] });
        const postsString = 'posts';
        const data = { _id: '123', text: 'newText' };

        const result = fromJS({ posts: [data] });

        expect(updatePost(oldState, postsString, data)).toEqual(result);
    });

    it('deletePost - should return new state without deleted post in posts array', () => {
        const oldState = fromJS({ posts: [{ creator: { _id: '123' } }] });
        const data = [];
        localStorage.setItem('userId', '123');

        const result = fromJS({ posts: data });

        expect(deletePost(oldState, data)).toEqual(result);
    });

    it('getAllPosts - should return new state with all posts without repeating', () => {
        const oldState = fromJS({ posts: [{ _id: '123', creator: { _id: '123' } }] });
        const data = [{ _id: '123', creator: { _id: '123' } }, { _id: '321', creator: { _id: '3' } }];
        localStorage.setItem('userId', '123');

        const result = fromJS({ posts: data });

        expect(getAllPosts(oldState, data)).toEqual(result);
    });
});