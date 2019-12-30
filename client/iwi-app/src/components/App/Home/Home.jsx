import React, { Component } from 'react';
import { connect } from 'react-redux';
import MakePostDiv from '../../PostComponents/CreatePostForm';
import PostsSection from '../../PostComponents/PostsSection';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';

import { getUserPosts, getAllSubsPosts, uploadPost, editPost, likePost, dislikePost, deletePost } from '../../../services/postsService';
import { likeComment, dislikeComment, deleteComment, makeComment } from '../../../services/commentsService'

class Home extends Component {
    componentDidUpdate(prevProps) {
        if ((prevProps.connectionStatus !== this.props.connectionStatus) && this.props.connectionStatus) {
            this.props.getSubsPosts();
            this.props.getUserPosts(localStorage.getItem('userId'));
        }
    }

    render() {
        return (
            <main>
                <MakePostDiv
                    user={this.props.currentUser.toJS()}
                    uploadHandler={this.props.upload}
                />
                <PostsSection
                    posts={this.props.posts.toJS()}
                    likePostHandler={this.props.like}
                    dislikePostHandler={this.props.dislike}
                    editUserPostHandler={this.props.editUserPost}
                    deletePostHandler={this.props.delPost}
                    likeCommentHandler={this.props.likeCom}
                    dislikeCommentHandler={this.props.dislikeCom}
                    deleteCommentHandler={this.props.deleteCom}
                    currentUser={this.props.currentUser.toJS()}
                    makeCommentHandler={this.props.makeCom}
                    fetchStatus={this.props.fetchStatus}
                />
            </main>
        )
    }

    componentDidMount() {
        //when home component is rendered always fetch subs posts 
        this.props.getSubsPosts();
        this.props.getUserPosts(localStorage.getItem('userId'));
    }
}

export function filterHomePosts(state) {
    return state.postsReducer.get('posts').filter((post) => {
        const currPostCreatorId = post.getIn(['creator', '_id']);
        const currentUserId = localStorage.getItem('userId');
        const currentUserSubs = state.systemReducer.getIn(['currentUser', 'subscriptions']);

        return ((currPostCreatorId === currentUserId) || (currentUserSubs.some(sub => sub.get('_id') === currPostCreatorId)))
    })
}

function mapStateToProps(state) {
    return {
        currentUser: state.systemReducer.get('currentUser'),
        posts: filterHomePosts(state),
        fetchStatus: state.systemReducer.get('fetchStatus'),
        connectionStatus: state.systemReducer.get('connectionStatus'),
        errors: state.errors
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserPosts: (id) => dispatch(getUserPosts(id)),
        getSubsPosts: () => dispatch(getAllSubsPosts()),
        upload: (data) => dispatch(uploadPost(data)),
        like: (postId) => dispatch(likePost(postId)),
        dislike: (postId) => dispatch(dislikePost(postId)),
        editUserPost: (data, postId) => dispatch(editPost(data, postId)),
        delPost: (postId) => dispatch(deletePost(postId)),
        likeCom: (_id) => dispatch(likeComment(_id)),
        dislikeCom: (_id) => dispatch(dislikeComment(_id)),
        deleteCom: (_id) => dispatch(deleteComment(_id)),
        makeCom: (data) => dispatch(makeComment(data))
    }
}

Home.propTypes = {
    getSubsposts: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map),
    posts: PropTypes.instanceOf(List),
    getUserPosts: PropTypes.func,
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);