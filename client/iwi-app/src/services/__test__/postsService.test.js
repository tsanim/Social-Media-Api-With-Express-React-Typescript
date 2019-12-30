import nock from 'nock';
import configureStore from 'redux-mock-store';
import * as fetchStatusTypes from '../../store/actions/fetchStatusActions/actionTypes';
import * as postsService from '../postsService';
import * as postsActionTypes from '../../store/actions/postsAtions/actionTypes';
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Posts service', () => {
    it('getAllSubsPosts - should test if a call return user subcribers posts data', (done) => {
        let data = { posts: [] };

        nock('http://localhost:9999')
            .filteringPath(() => '/feed/posts')
            .get('/feed/posts')
            .reply(200, data);

        const store = mockStore({ posts: [] });

        const expectedActions = [{
            type: fetchStatusTypes.FETCH_BEGIN
        }, {
            type: fetchStatusTypes.FETCH_DATA
        }, {
            type: postsActionTypes.GET_SUB_USERS_POSTS,
            data: data.posts
        }];

        return store.dispatch(postsService.getAllSubsPosts()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('getUserPosts - should test if a call return user posts data', (done) => {
        let data = { posts: [] };

        nock('http://localhost:9999')
            .get('/feed/posts/123')
            .reply(200, data);

        const store = mockStore({ posts: [] });

        const expectedActions = [{
            type: fetchStatusTypes.FETCH_BEGIN
        }, {
            type: fetchStatusTypes.FETCH_DATA
        }, {
            type: postsActionTypes.GET_USER_POSTS,
            data: data.posts
        }];

        return store.dispatch(postsService.getUserPosts('123')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('uploadPosts - should test if a call create posts and return post data', (done) => {
        let data = { post: {} };
        let body = { text: 'text' };

        nock('http://localhost:9999')
            .post('/feed/posts/create', body)
            .reply(200, data);

        const store = mockStore({ posts: [] });

        const expectedActions = [{
            type: fetchStatusTypes.FETCH_BEGIN
        }, {
            type: fetchStatusTypes.FETCH_DATA
        }, {
            type: postsActionTypes.MAKE_POST,
            data: data.post
        }];

        return store.dispatch(postsService.uploadPost(body)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('searchPosts - should test if a call with query params find posts', (done) => {
        let data = { foundPosts: [] };

        nock('http://localhost:9999')
            .get('/feed/searchPosts')
            .query({ searchText: 'text' })
            .reply(200, data);

        const store = mockStore({ posts: [] });

        const expectedActions = [{
            type: fetchStatusTypes.FETCH_BEGIN
        }, {
            type: fetchStatusTypes.FETCH_DATA
        }, {
            type: postsActionTypes.SEARCH_POSTS,
            data: data.foundPosts
        }];

        return store.dispatch(postsService.searchPosts({ searchText: 'text' })).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('likePost - should test if a call to like posts is succesfull', (done) => {
        nock('http://localhost:9999')
            .put('/feed/posts/like/123')
            .reply(200);

        const store = mockStore({ posts: [] });

        return store.dispatch(postsService.likePost('123')).then(() => {
            done();
        });
    });

    it('dislikePost - should test if a call to like posts is succesfull', (done) => {
        nock('http://localhost:9999')
            .put('/feed/posts/dislike/123')
            .reply(200);

        const store = mockStore({ posts: [] });

        return store.dispatch(postsService.dislikePost('123')).then(() => {
            done();
        });
    });

    it('deletePost - should test if a call delete post and return new posts data', (done) => {
        let data = { posts: [] };

        nock('http://localhost:9999')
            .delete('/feed/posts/123')
            .reply(200, data);

        const store = mockStore({ posts: [] });

        const expectedActions = [{
            type: fetchStatusTypes.FETCH_BEGIN
        }, {
            type: fetchStatusTypes.FETCH_DATA
        }, {
            type: postsActionTypes.DELETE_POST,
            data: data.posts
        }];

        return store.dispatch(postsService.deletePost('123')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);

            done();
        });
    });

    it('editPost - should test if a call edit post and return new post data', (done) => {
        let data = { post: {} };

        nock('http://localhost:9999')
            .put('/feed/posts/edit/123')
            .reply(200, data);

        const store = mockStore({ posts: [] });

        const expectedActions = [{
            type: fetchStatusTypes.FETCH_BEGIN
        }, {
            type: fetchStatusTypes.FETCH_DATA
        }, {
            type: postsActionTypes.EDIT_POST,
            data: data.post
        }];

        return store.dispatch(postsService.editPost({}, '123')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);

            done();
        });
    });
});