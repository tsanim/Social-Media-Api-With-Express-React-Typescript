import * as fetchStatusActionsCreator from '../fetchStatusActions/actionsCreator';

import * as fetchStatusActionsTypes from '../fetchStatusActions/actionTypes';

describe('Fetchstatus actions', () => {
    it('beginFetch - should return action object with fetch begin type', () => {
        let expectedResult = {
            type: fetchStatusActionsTypes.FETCH_BEGIN,
        }

        let result = fetchStatusActionsCreator.beginFetch();

        expect(result).toEqual(expectedResult);
    });

    it('fetchData - should return action object with fetch data type', () => {
        let expectedResult = {
            type: fetchStatusActionsTypes.FETCH_DATA,
        }

        let result = fetchStatusActionsCreator.fetchData();

        expect(result).toEqual(expectedResult);
    });

    it('errorFetch - should return action object with fetch error type', () => {
        let expectedResult = {
            type: fetchStatusActionsTypes.FETCH_ERROR,
        }

        let result = fetchStatusActionsCreator.errorFetch();

        expect(result).toEqual(expectedResult);
    });
});