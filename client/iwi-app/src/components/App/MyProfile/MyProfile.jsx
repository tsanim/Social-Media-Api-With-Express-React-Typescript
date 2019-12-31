import React, { Component } from 'react';
import MakePostDiv from '../../PostComponents/CreatePostForm';
import UserInfoContainer from '../../UserInfoComponents/UserInfoContainer';
import { connect } from 'react-redux';
import Modal from '../../Modals/Modal';
import PostsSection from '../../PostComponents/PostsSection';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';

import CommentsService from '../../../services/commentsService';
import PostsService from '../../../services/postsService';

class MyProfile extends Component {
    state = {
        showModal: false,
        users: [],
        modalHeaderName: '',
    }

    handleShow = (e) => {
        e.persist();

        this.setState((oldState) => ({ showModal: true, users: this.props.currentUser.get(e.target.id).toJS(), modalHeaderName: e.target.name }));
    }

    handleClose = (e) => {
        e.persist();

        this.setState((oldState) => ({ showModal: false, users: [], modalHeaderName: '' }));
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.connectionStatus !== this.props.connectionStatus) && this.props.connectionStatus) {
            this.props.getUserPosts(localStorage.getItem('userId'));
        }
    }

    componentDidMount() {
        this.props.getUserPosts(localStorage.getItem('userId'));
    }

    render() {
        const { showModal, modalHeaderName, users } = this.state;

        return (
            <main>
                <UserInfoContainer
                    user={{ ...this.props.currentUser.toJS(), posts: this.props.userPosts.toJS() }}
                    modalShowHandler={this.handleShow}
                />
                <MakePostDiv
                    user={this.props.currentUser.toJS()}
                    uploadHandler={this.props.upload}
                />

                <PostsSection
                    posts={this.props.userPosts.toJS()}
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

                {/* Modal for followers or following users */}
                {
                    showModal ? <Modal handleClose={this.handleClose} modalHeaderName={modalHeaderName} users={users} /> : null
                }

            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.systemReducer.get('currentUser'),
        userPosts: state.postsReducer.get('posts').filter(post => post.getIn(['creator', '_id']) === localStorage.getItem('userId')),
        fetchStatus: state.systemReducer.get('fetchStatus'),
        connectionStatus: state.systemReducer.get('connectionStatus')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        upload: (data) => dispatch(PostsService.uploadPost(data)),
        like: (postId) => dispatch(PostsService.likePost(postId)),
        dislike: (postId) => dispatch(PostsService.dislikePost(postId)),
        delPost: (postId) => dispatch(PostsService.deletePost(postId)),
        getUserPosts: (id) => dispatch(PostsService.getUserPosts(id)),
        editUserPost: (data, postId) => dispatch(PostsService.editPost(data, postId)),
        likeCom: (_id) => dispatch(CommentsService.likeComment(_id)),
        dislikeCom: (_id) => dispatch(CommentsService.dislikeComment(_id)),
        deleteCom: (_id) => dispatch(CommentsService.deleteComment(_id)),
        makeCom: (data) => dispatch(CommentsService.makeComment(data)),
    }
}

MyProfile.propTypes = {
    currUser: PropTypes.instanceOf(Map),
    userPosts: PropTypes.instanceOf(List),
    connectionStatus: PropTypes.bool,
    getUserPosts: PropTypes.func,
    upload: PropTypes.func,
    fetchStatus: PropTypes.number,
    like: PropTypes.func,
    dislike: PropTypes.func,
    editUserPost: PropTypes.func,
    delPost: PropTypes.func,
    likeCom: PropTypes.func,
    dislikeCom: PropTypes.func,
    makeCom: PropTypes.func,
    deleteCom: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
