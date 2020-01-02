import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import errors from './reducers/errorsReducer/errorsReducer';
import systemReducer from './reducers/systemReducer/systemReducer';
import usersReducer from './reducers/usersReducer/usersReducer';
import postsReducer from './reducers/postsReducer/postsReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import immutableTransform from 'redux-persist-transform-immutable';

const persistConfig = {
    transforms: [immutableTransform()],
    key: 'root',
    storage: storage,
    whitelist: ['systemReducer', 'postsReducer', 'usersReducer']
}

const myPersistReducer = persistReducer(persistConfig, combineReducers({ systemReducer, postsReducer, usersReducer, errorsReducer: errors }));

export default () => {
    let store = createStore(myPersistReducer, applyMiddleware(thunk));
    let persistor = persistStore(store);

    return { store, persistor }
} 
