import nock from 'nock';
import configureStore from 'redux-mock-store';
import * as usersActionsTypes from '../../store/actions/usersActions/actionTypes';
import * as usersService from '../usersService';
import * as authActionsTypes from '../../store/actions/authActions/actionTypes';
import * as userPostsActionsTypes from '../../store/actions/postsAtions/actionTypes';
import * as fetchStatusActionsTypes from '../../store/actions/fetchStatusActions/actionTypes';
import thunk from 'redux-thunk'
import URI from '../../config/config';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Users service', () => {
    it('searchUser - should test if a call find user with query param would return data and return searchUser()', (done) => {
        const data = { foundUsers: [] };

        nock(URI)
            .get('/user/search')
            .query({ searchText: 'text' })
            .reply(200, data)

        const mockedStore = mockStore({ foundUsers: [] });

        const expectedActions = [{
            type: fetchStatusActionsTypes.FETCH_BEGIN
        }, {
            type: fetchStatusActionsTypes.FETCH_DATA
        }, {
            type: usersActionsTypes.SEARCH_USER,
            data: data.foundUsers
        }];

        return mockedStore.dispatch(usersService.searchUser({ searchText: 'text' })).then(() => {
            expect(mockedStore.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('getUser - should test if a call would get user with given id and then return getUserData() and setUserPosts()', (done) => {
        const data = { user: { posts: [] } };
        const userId = '123'

        nock(URI)
            .get('/user/info/' + userId)
            .reply(200, data)

        const mockedStore = mockStore({ foundUser: {} });

        const expectedActions = [{
            type: fetchStatusActionsTypes.FETCH_BEGIN
        }, {
            type: fetchStatusActionsTypes.FETCH_DATA
        }, {
            type: usersActionsTypes.GET_USER_DATA,
            data: data.user
        }, {
            type: userPostsActionsTypes.SET_USER_POSTS,
            data: data.user.posts
        }];

        return mockedStore.dispatch(usersService.getUser(userId)).then(() => {
            expect(mockedStore.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('followUser - should test if a call follow user and return new current user data and new followed user data and return followUser() for both Auth and Users reducers', (done) => {
        const data = { me: {}, user: {} };
        const userId = '123'

        nock(URI)
            .put('/user/follow/' + userId)
            .reply(200, data)

        //should i set mockstore like that
        const mockedStore = mockStore({
            systemReducer: { currentUser: {} },
            usersReducer: { foundUser: {} }
        });

        const expectedActions = [{
            type: fetchStatusActionsTypes.FETCH_BEGIN
        }, {
            type: fetchStatusActionsTypes.FETCH_DATA
        }, {
            type: authActionsTypes.FOLLOW_USER,
            data: data.me
        }, {
            type: usersActionsTypes.FOLLOW_USER,
            data: data.user
        }];

        return mockedStore.dispatch(usersService.followUser(userId)).then(() => {
            expect(mockedStore.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('unfollowUser - should test if a call follow user and return new current user data and new followed user data and return unfollowUser() for both Auth and Users reducers', (done) => {
        const data = { me: {}, user: {} };
        const userId = '123'

        nock(URI)
            .put('/user/unfollow/' + userId)
            .reply(200, data)

        //should i set mockstore like that
        const mockedStore = mockStore({
            systemReducer: { currentUser: {} },
            usersReducer: { foundUser: {} }
        });

        const expectedActions = [{
            type: fetchStatusActionsTypes.FETCH_BEGIN
        }, {
            type: fetchStatusActionsTypes.FETCH_DATA
        }, {
            type: authActionsTypes.UNFOLLOW_USER,
            data: data.me
        }, {
            type: usersActionsTypes.UNFOLLOW_USER,
            data: data.user
        }];

        return mockedStore.dispatch(usersService.unfollowUser(userId)).then(() => {
            expect(mockedStore.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('editUserInfo - should test if a call return new user data and return editUserInfo() for both Auth and Posts reducers', (done) => {
        const data = { user: { posts: [] } };
        const body = {}

        nock(URI)
            .put('/user/edit', body)
            .reply(200, data)

        //should i set mockstore like that
        const mockedStore = mockStore({
            systemReducer: { currentUser: {} }
        });

        const expectedActions = [{
            type: fetchStatusActionsTypes.FETCH_BEGIN
        }, {
            type: fetchStatusActionsTypes.FETCH_DATA
        }, {
            type: authActionsTypes.EDIT_USER_INFO,
            data: data.user
        }, {
            type: userPostsActionsTypes.EDIT_USER_INFO,
            data: data.user.posts
        }];

        return mockedStore.dispatch(usersService.editUserInfo(body)).then(() => {
            expect(mockedStore.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('changeUserPic - should test if a call return new user data and return editUserInfo() for both Auth and Posts reducers', (done) => {
        const data = { user: { posts: [] } };
        const body = {}

        nock(URI)
            .put('/user/changePic', body)
            .reply(200, data)

        //should i set mockstore like that
        const mockedStore = mockStore({
            systemReducer: { currentUser: {} }
        });

        const expectedActions = [{
            type: fetchStatusActionsTypes.FETCH_BEGIN
        }, {
            type: fetchStatusActionsTypes.FETCH_DATA
        }, {
            type: authActionsTypes.EDIT_USER_INFO,
            data: data.user
        }, {
            type: userPostsActionsTypes.EDIT_USER_INFO,
            data: data.user.posts
        }];

        return mockedStore.dispatch(usersService.changeUserPic(body)).then(() => {
            expect(mockedStore.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('changePassword - should test if a call is with success', (done) => {
        const data = { user: { posts: [] } };
        const body = {}

        nock(URI)
            .put('/user/changePassword', body)
            .reply(200, data)

        //should i set mockstore like that
        const mockedStore = mockStore({
            systemReducer: { currentUser: {} }
        });

        const expectedActions = [{
            type: fetchStatusActionsTypes.FETCH_BEGIN
        }, {
            type: fetchStatusActionsTypes.FETCH_DATA
        }];

        return mockedStore.dispatch(usersService.changePassword(body)).then(() => {
            expect(mockedStore.getActions()).toEqual(expectedActions);
            done();
        });
    });

    //test if a call with wrong params dispatch errors
});