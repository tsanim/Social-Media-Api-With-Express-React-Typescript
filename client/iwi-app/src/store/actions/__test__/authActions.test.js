import * as authActionsCreator from '../authActions/actionsCreator';
import * as authActionsTypes from '../authActions/actionTypes';

describe('Auth actions', () => {
    it('loginUser - should return action object with register type and data object', () => {
        let expectedResult = {
            type: authActionsTypes.LOGIN_USER,
            data: {}
        }
        let data = {};
        let result = authActionsCreator.loginUser(data);

        expect(result).toEqual(expectedResult);
    });

    it('followUser - should return action object with follow user type and data object', () => {
        let expectedResult = {
            type: authActionsTypes.FOLLOW_USER,
            data: {}
        }
        let data = {};

        let result = authActionsCreator.followUser(data);

        expect(result).toEqual(expectedResult);
    });

    it('editInfo - should return action object with edit type and data object', () => {
        let expectedResult = {
            type: authActionsTypes.FOLLOW_USER,
            data: {}
        }

        let data = {};

        let result = authActionsCreator.followUser(data);

        expect(result).toEqual(expectedResult);
    });

    it('unfollowUser - should return action object with unfollow type and data object', () => {
        let expectedResult = {
            type: authActionsTypes.UNFOLLOW_USER,
            data: {}
        }
        
        let data = {};

        let result = authActionsCreator.unfollowUser(data);

        expect(result).toEqual(expectedResult);
    });

    it('logout - should return action object with logout type', () => {
        let expectedResult = {
            type: authActionsTypes.LOGOUT,
        }
        
        let result = authActionsCreator.logout();

        expect(result).toEqual(expectedResult);
    });
});