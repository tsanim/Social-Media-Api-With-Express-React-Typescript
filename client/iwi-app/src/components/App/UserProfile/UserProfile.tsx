import React, { Component } from 'react';
import PostsSection from '../../PostComponents/PostsSection';
import Modal from '../../Modals/Modal';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import UserInfoContainer from '../../UserInfoComponents/UserInfoContainer';
import PropTypes from 'prop-types';
import { List, Map } from "immutable";

import { UserProfileProps, connector } from '../../../interfaces/Components/UserProfile/UserProfileProps.interface';
import User from '../../../interfaces/User/User.interface';
import UserProfileState from '../../../interfaces/Components/UserProfile/UserProfileState.interface';

class UserProfile extends Component<UserProfileProps, UserProfileState> {
    constructor(props: UserProfileProps) {
        super(props);

        this.state = {
            showModal: false,
            users: [],
            modalHeaderName: '',
        }
    }

    handleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.persist();

        const users: User[] = this.props.user.get(e.currentTarget.id).toJS();
        const modalHeaderName: string = e.currentTarget.name;

        this.setState((oldState) => ({ showModal: true, users, modalHeaderName }));
    }

    handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.persist();

        this.setState((oldState) => ({ showModal: false, users: [], modalHeaderName: '' }));
    }

    render() {
        const { user, foundUserPosts } = this.props;

        if (user.size === 0) {
            return <Loader />
        }

        const isFollowed: boolean = user.get('followers').findIndex((u: User) => u.get('_id') === localStorage.getItem('userId')) >= 0;

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
                    likeCommentHandler={this.props.likeCom}
                    dislikeCommentHandler={this.props.dislikeCom}
                    currentUser={this.props.currentUser.toJS()}
                    makeCommentHandler={this.props.makeCom}
                    deleteCommentHandler={this.props.deleteCom}
                />

                {/* Modal for followers or following users */}
                { this.state.showModal ? <Modal handleClose={this.handleClose} modalHeaderName={this.state.modalHeaderName} users={this.state.users} /> : null }
            </main>
        )
    }

    //when url change, make sure that component will fetch new user data and will re-render
    componentDidUpdate(prevProps: UserProfileProps) {
        if (prevProps.match.params.userId !== this.props.match.params.userId) {
            this.props.getUserInfo(this.props.match.params.userId)
        }
    }

    componentDidMount() {
        this.props.getUserInfo(this.props.match.params.userId)
    }
}

// UserProfile.propTypes = {
//     user: PropTypes.instanceOf(Map),
//     foundUserPosts: PropTypes.instanceOf(List),
//     currentUser: PropTypes.instanceOf(Map),
//     fetchStatus: PropTypes.number,
//     unfollow: PropTypes.func,
//     follow: PropTypes.func,
//     like: PropTypes.func,
//     getUserInfo: PropTypes.func,
//     dislike: PropTypes.func,
//     likeCom: PropTypes.func,
//     dislikeCom: PropTypes.func,
//     makeCom: PropTypes.func,
//     deleteCom: PropTypes.func,
// }

export default connector(UserProfile);
