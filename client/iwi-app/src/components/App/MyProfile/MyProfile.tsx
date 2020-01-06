import React, { Component } from 'react';
import MakePostDiv from '../../PostComponents/CreatePostForm';
import UserInfoContainer from '../../UserInfoComponents/UserInfoContainer';
import Modal from '../../Modals/Modal';
import PostsSection from '../../PostComponents/PostsSection';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';

import { MyProfileProps, connector } from '../../../interfaces/Components/MyProfile/MyProfileProps.interface';
import UserProfileState from '../../../interfaces/Components/UserProfile/UserProfileState.interface';
import User, { PlainUser } from '../../../interfaces/User/User.interface';

class MyProfile extends Component<MyProfileProps, UserProfileState> {
    constructor(props: MyProfileProps) {
        super(props);

        this.state = {
            showModal: false,
            users: [],
            modalHeaderName: '',
        }
    }


    handleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.persist();

        const users: User[] = this.props.currentUser.get(e.currentTarget.id).toJS();
        const modalHeaderName: string = e.currentTarget.name;

        this.setState((oldState) => ({ showModal: true, users, modalHeaderName }));
    }

    handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.persist();

        this.setState((oldState) => ({ showModal: false, users: [], modalHeaderName: '' }));
    }

    componentDidUpdate(prevProps: MyProfileProps) {
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
                    user={this.props.currentUser.toJS() as PlainUser}
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
                { showModal ? <Modal handleClose={this.handleClose} modalHeaderName={modalHeaderName} users={users} /> : null }

            </main>
        )
    }
}

// MyProfile.propTypes = {
//     currentUser: PropTypes.instanceOf(Map),
//     userPosts: PropTypes.instanceOf(List),
//     connectionStatus: PropTypes.bool,
//     getUserPosts: PropTypes.func,
//     upload: PropTypes.func,
//     fetchStatus: PropTypes.number,
//     like: PropTypes.func,
//     dislike: PropTypes.func,
//     editUserPost: PropTypes.func,
//     delPost: PropTypes.func,
//     likeCom: PropTypes.func,
//     dislikeCom: PropTypes.func,
//     makeCom: PropTypes.func,
//     deleteCom: PropTypes.func,
// }

export default connector(MyProfile);
