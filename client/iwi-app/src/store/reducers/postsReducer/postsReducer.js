import * as userPostsActionTypes from '../../actions/postsAtions/actionTypes';
import { Map, fromJS } from 'immutable';

export const initState = fromJS({
    foundPosts: [],
    posts: []
});


export function updatePost(oldState, postsString, data) {
    let indexOfChangedPost = oldState.get(postsString).findIndex(obj => (Map.isMap(obj) ? obj.get('_id') : obj._id) === data._id);

    if (indexOfChangedPost !== -1) {
        return oldState.setIn([postsString, indexOfChangedPost], fromJS(data));
    }

    return oldState;
}

export function deletePost(oldState, data) {
    let filteredPosts = oldState.get('posts').filter(p => (Map.isMap(p) ? p.getIn(['creator', '_id']) : p.creator._id) !== localStorage.getItem('userId'));

    return oldState.set('posts', fromJS([...filteredPosts.toJS(), ...data]));
}

export function getAllPosts(oldState, data) {
    let oldPosts = oldState.get('posts');
    let newPosts = data;

    for (let i = 0; i < newPosts.length; i++) {
        const index = oldState.get('posts').findIndex(p => {
            return p.get('_id') === newPosts[i]._id;
        });

        if (index !== -1) {
            oldPosts = oldPosts.set(index, fromJS(newPosts[i]))
        } else {
            oldPosts = oldPosts.push(fromJS(newPosts[i]));
        }
    }

    return oldState.set('posts', oldPosts);
}

export default function posts(oldState = initState, action) {
    switch (action.type) {
        case userPostsActionTypes.GET_SUB_USERS_POSTS:
        case userPostsActionTypes.GET_USER_POSTS:
        case userPostsActionTypes.SET_USER_POSTS:
           return getAllPosts(oldState, action.data);
        case userPostsActionTypes.DELETE_COMMENT:
            return updatePost(oldState, 'posts', action.data);
        case userPostsActionTypes.COMMENT_POST:
            return updatePost(oldState, 'posts', action.data);
        case userPostsActionTypes.EDIT_POST:
            return updatePost(oldState, 'posts', action.data);
        case userPostsActionTypes.DELETE_POST:
            return deletePost(oldState, action.data);
        case userPostsActionTypes.MAKE_POST:
            return oldState.update('posts', posts => posts.push(fromJS(action.data)));
        case userPostsActionTypes.SEARCH_POSTS:
            return oldState.set('foundPosts', fromJS(action.data));
        case userPostsActionTypes.COMMENT_FOUND_POST:
            return updatePost(oldState, 'foundPosts', action.data);
        case userPostsActionTypes.DELETE_COMMENT_FOUND_POST:
            return updatePost(oldState, 'foundPosts', action.data);
        case userPostsActionTypes.RESET_POSTS:
            return initState;
        default:
            return oldState;
    }
}