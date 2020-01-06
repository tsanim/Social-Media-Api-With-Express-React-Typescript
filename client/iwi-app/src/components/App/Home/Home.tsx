import React, { Component } from 'react';
import MakePostDiv from '../../PostComponents/CreatePostForm';
import PostsSection from '../../PostComponents/PostsSection';
import { Map, List } from 'immutable';
import PropTypes from 'prop-types';

import { HomeProps, connector } from '../../../interfaces/Components/Home/HomeProps.interface';
import { PlainUser } from '../../../interfaces/User/User.interface';

class Home extends Component<HomeProps> {
    componentDidUpdate(prevProps: HomeProps) {
        if ((prevProps.connectionStatus !== this.props.connectionStatus) && this.props.connectionStatus) {
            this.props.getSubsPosts();
            this.props.getUserPosts(localStorage.getItem('userId'));
        }
    }

    render() {
        return (
            <main>
                <MakePostDiv
                    user={this.props.currentUser.toJS() as PlainUser}
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

// Home.propTypes = {
//     getSubsposts: PropTypes.instanceOf(List),
//     currentUser: PropTypes.instanceOf(Map),
//     posts: PropTypes.instanceOf(List),
//     getUserPosts: PropTypes.func,
// }

export default connector(Home);