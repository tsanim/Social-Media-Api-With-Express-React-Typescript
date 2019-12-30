import React, { Component } from 'react';
import { connect } from 'react-redux';
import PostsSection from '../../PostComponents/PostsSection';
import { followUser, unfollowUser, getUser } from '../../../services/usersService';
import Modal from '../../Modals/Modal';
import { Redirect } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import UserInfoContainer from '../../UserInfoComponents/UserInfoContainer';
import PropTypes from 'prop-types';
import {List, Map} from "immutable";

import { likePost, dislikePost } from '../../../services/postsService';
import { likeComment, dislikeComment, makeComment, deleteComment } from '../../../services/commentsService';

class UserProfile extends Component {
    state = {
        showModal: false,
        users: [],
        modalHeaderName: '',
    }

    handleShow = (e) => {
        e.persist();

        this.setState((oldState) => ({ showModal: true, users: this.props.user.get(e.target.id).toJS(), modalHeaderName: e.target.name }));
    }

    handleClose = (e) => {
        e.persist();

        this.setState((oldState) => ({ showModal: false, users: [], modalHeaderName: '' }));
    }

    render() {
        const { user, foundUserPosts } = this.props;

        if (user.size === 0) {
            return <Loader />
        }

        const isFollowed = user.get('followers').findIndex(u => u.get('_id') === localStorage.getItem('userId')) >= 0;

        if (user.get('id') === localStorage.getItem('userId')) {
            return <Redirect to="/MyProfile" />
        }

        return (
            <main>
                <UserInfoContainer
                    user={{ ...user.toJS(), _id: user.get('id') || user.get('_id') }}
                    modalShowHandler={this.handleShow}
                    unfollowHandler={this.props.unfollow}
                    followHandler={this.props.follow}
                    isFollowed={isFollowed}
                />

                <PostsSection
                    posts={foundUserPosts.toJS()}
                    likePostHandler={this.props.like}
                    dislikePostHandler={this.props.dislike}
                    editUserPostHandler={this.props.editUserPost}
                    likeCommentHandler={this.props.likeCom}
                    dislikeCommentHandler={this.props.dislikeCom}
                    currentUser={this.props.currentUser.toJS()}
                    makeCommentHandler={this.props.makeCom}
                    deleteCommentHandler={this.props.deleteCom}
                />

                {/* Modal for followers or following users */}
                {
                    this.state.showModal ? <Modal handleClose={this.handleClose} modalHeaderName={this.state.modalHeaderName} users={this.state.users} /> : null
                }
            </main>
        )
    }

    //when url change, make sure that component will fetch new user data and will re-render
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.getUserInfo(this.props.match.params.userId)
        }
    }

    componentDidMount() {
        this.props.getUserInfo(this.props.match.params.userId)
    }
}

function mapStateToProps(state) {
    return {
        user: state.usersReducer.get('foundUser'),
        foundUserPosts: state.postsReducer.get('posts').filter(post => post.getIn(['creator', '_id']) === (state.usersReducer.getIn(['foundUser', 'id']) ? state.usersReducer.getIn(['foundUser', 'id']) : state.usersReducer.getIn(['foundUser', '_id']))),
        currentUser: state.systemReducer.get('currentUser')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        follow: (userId) => dispatch(followUser(userId)),
        unfollow: (userId) => dispatch(unfollowUser(userId)),
        getUserInfo: (userId) => dispatch(getUser(userId)),
        like: (postId) => dispatch(likePost(postId)),
        dislike: (postId) => dispatch(dislikePost(postId)),
        likeCom: (_id) => dispatch(likeComment(_id)),
        dislikeCom: (_id) => dispatch(dislikeComment(_id)),
        deleteCom: (_id) => dispatch(deleteComment(_id)),
        makeCom: (data) => dispatch(makeComment(data))
    }
}

UserProfile.propTypes = {
    user: PropTypes.instanceOf(Map),
    foundUserPosts: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map),
    fetchStatus: PropTypes.number,
    unfollow: PropTypes.func,
    follow: PropTypes.func,
    like: PropTypes.func,
    search: PropTypes.func,
    getUserInfo: PropTypes.func,
    dislike: PropTypes.func,
    editUserPost: PropTypes.func,
    delPost: PropTypes.func,
    likeCom: PropTypes.func,
    dislikeCom: PropTypes.func,
    makeCom: PropTypes.func,
    deleteCom: PropTypes.func,
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
