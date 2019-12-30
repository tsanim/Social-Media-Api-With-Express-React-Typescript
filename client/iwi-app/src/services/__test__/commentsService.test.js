import nock from 'nock';
import configureStore from 'redux-mock-store';
import * as commentsService from '../commentsService';
import * as fetchStatusTypes from '../../store/actions/fetchStatusActions/actionTypes';
import * as postsActionTypes from '../../store/actions/postsAtions/actionTypes';
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Comments service', () => {
    it('makeComment - should test if a call make a comment and return new post data', (done) => {
        let data = { post: {} };
        let body = {};

        nock('http://localhost:9999')
            .post('/feed/comments/create', body)
            .reply(200, data);

        const store = mockStore({ posts: [] });

        const expectedActions = [{
            type: postsActionTypes.COMMENT_POST,
            data: data.post
        }, {
            type: postsActionTypes.COMMENT_FOUND_POST,
            data: data.post
        }];

        return store.dispatch(commentsService.makeComment(body)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('likeComment - should test if a call like comment succesfully', (done) => {
        let commentId = '123';

        nock('http://localhost:9999')
            .put('/feed/comments/like/' + commentId)
            .reply(200);

        const store = mockStore({ posts: [] });

        return store.dispatch(commentsService.likeComment(commentId)).then(() => {
            done();
        });
    });

    it('dislikeComment - should test if a call dislike comment succesfully', (done) => {
        let commentId = '123';

        nock('http://localhost:9999')
            .put('/feed/comments/dislike/' + commentId)
            .reply(200);

        const store = mockStore({ posts: [] });

        return store.dispatch(commentsService.dislikeComment(commentId)).then(() => {
            done();
        });
    });

    it('deleteComment - should test if a call return new post data and return deleteComment() and deleteFoundPostComment() for posts reducer', (done) => {
        let data = { post: {} };
        let commentId = '123';

        nock('http://localhost:9999')
            .delete('/feed/comments/delete/' + commentId)
            .reply(200, data);

        const store = mockStore({ posts: [] });

        const expectedActions = [{
            type: postsActionTypes.DELETE_COMMENT,
            data: data.post
        }, {
            type: postsActionTypes.DELETE_COMMENT_FOUND_POST,
            data: data.post
        }];

        return store.dispatch(commentsService.deleteComment(commentId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });
});