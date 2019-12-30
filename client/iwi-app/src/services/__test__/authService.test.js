import nock from 'nock';
import configureStore from 'redux-mock-store';
import * as fetchStatusTypes from '../../store/actions/fetchStatusActions/actionTypes';
import * as authActionsTypes from '../../store/actions/authActions/actionTypes';
import * as authService from '../authService';

import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Auth service', () => {
    it('loginUser - should test if a call to sign in return data and then return registerUser', async (done) => {
        let data = { user: {}, token: '' }
        let body = { email: '', password: '' };

        nock('http://localhost:9999')
            .post('/auth/signin', body)
            .reply(200, data);

        const store = mockStore({ currUser: {} });

        const expectedActions = [{
            type: fetchStatusTypes.FETCH_BEGIN
        }, {
            type: fetchStatusTypes.FETCH_DATA
        }, {
            type: authActionsTypes.LOGIN_USER,
            data: data.user
        }];

        return store.dispatch(authService.loginUser(body)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('registerUser - should test if a call to register should succeed', async (done) => {
        let body = { };

        nock('http://localhost:9999')
            .post('/auth/signup', body)
            .reply(200, { message: '' });

        const store = mockStore({ currUser: {} });

        const expectedActions = [{
            type: fetchStatusTypes.FETCH_BEGIN
        }, {
            type: fetchStatusTypes.FETCH_DATA
        }];

        return store.dispatch(authService.registerUser(body)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('setCurrentUser - should test if a call return data and call ', async (done) => {
        const userId = '123';
        const data = { user: {} };

        nock('http://localhost:9999')
            .get('/user/info/' + userId)
            .reply(200, data);

        const store = mockStore({ currUser: {} });

        const expectedActions = [{
            type: authActionsTypes.SET_CURRENT_USER,
            data: data.user
        }];

        return store.dispatch(authService.setCurrentUser(userId)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });
});