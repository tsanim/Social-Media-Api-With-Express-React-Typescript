import * as errorsAcionsCreator from '../errorsActions/actionsCreator';

import * as errorsAcionsTypes from '../errorsActions/actionTypes';

describe('Errors actions', () => {
    it('fetchError - should return action object with error type and data object', () => {
        let expectedResult = {
            type: errorsAcionsTypes.ERROR,
            data: {}
        }

        let data = {};
        let result = errorsAcionsCreator.fetchError(data);

        expect(result).toEqual(expectedResult);
    });

    it('resetErrors - should return action object with reset errors type', () => {
        let expectedResult = {
            type: errorsAcionsTypes.RESET_ERRORS,
        }

        let result = errorsAcionsCreator.resetErrors();

        expect(result).toEqual(expectedResult);
    });
});