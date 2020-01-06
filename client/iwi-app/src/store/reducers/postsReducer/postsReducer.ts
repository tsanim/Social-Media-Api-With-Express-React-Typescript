import UserPostsActionTypes from '../../actions/postsAtions/actionTypes';
import { Map, fromJS, List } from 'immutable';
import { PostsAction } from '../../../types';
import PostsReducer from '../../../interfaces/Store/Reducers/PostsReducer.interface';
import Post from '../../../interfaces/Feed/Post.interface';
import User from '../../../interfaces/User/User.interface';

export const initState: PostsReducer = fromJS({
    foundPosts: [],
    posts: []
});


export function updatePost(oldState: PostsReducer, postsString: string, data: any) {
    let indexOfChangedPost = oldState.get(postsString).findIndex((obj: any) => (Map.isMap(obj) ? obj.get('_id') : obj._id) === data._id);

    if (indexOfChangedPost !== -1) {
        return oldState.setIn([postsString, indexOfChangedPost], fromJS(data));
    }

    return oldState;
}

export function deletePost(oldState: PostsReducer, data: any) {
    let filteredPosts = oldState.get('posts').filter((p: Post | { creator: User }) => (Map.isMap(p) ? p.getIn(['creator', '_id']) : p.creator._id) !== localStorage.getItem('userId'));

    return oldState.set('posts', fromJS([...filteredPosts.toJS(), ...data]));
}

export function getAllPosts(oldState: PostsReducer, data: any) {
    let oldPosts = oldState.get('posts');
    let newPosts = data;

    for (let i = 0; i < newPosts.length; i++) {
        const index = oldState.get('posts').findIndex((p: any) => {
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

export default function posts(oldState = initState, action: PostsAction) {
    switch (action.type) {
        case UserPostsActionTypes.GET_SUB_USERS_POSTS:
        case UserPostsActionTypes.GET_USER_POSTS:
        case UserPostsActionTypes.SET_USER_POSTS:
            return getAllPosts(oldState, action.data);
        case UserPostsActionTypes.DELETE_COMMENT:
            return updatePost(oldState, 'posts', action.data);
        case UserPostsActionTypes.COMMENT_POST:
            return updatePost(oldState, 'posts', action.data);
        case UserPostsActionTypes.EDIT_POST:
            return updatePost(oldState, 'posts', action.data);
        case UserPostsActionTypes.DELETE_POST:
            return deletePost(oldState, action.data);
        case UserPostsActionTypes.MAKE_POST:
            return oldState.update('posts', (posts: List<any>) => posts.push(fromJS(action.data)));
        case UserPostsActionTypes.SEARCH_POSTS:
            return oldState.set('foundPosts', fromJS(action.data));
        case UserPostsActionTypes.COMMENT_FOUND_POST:
            return updatePost(oldState, 'foundPosts', action.data);
        case UserPostsActionTypes.DELETE_COMMENT_FOUND_POST:
            return updatePost(oldState, 'foundPosts', action.data);
        case UserPostsActionTypes.RESET_POSTS:
            return initState;
        default:
            return oldState;
    }
}