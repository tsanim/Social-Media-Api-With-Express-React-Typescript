import React, { Component } from 'react';
import PostSection from '../../PostComponents/PostsSection';
import { connect } from 'react-redux';
import SearchForm from '../../Forms/SearchForm';
import PropTypes from 'prop-types';
import {List, Map} from "immutable";

import { likePost, dislikePost, deletePost, searchPosts, editPost } from '../../../services/postsService'
import { likeComment, dislikeComment, deleteComment, makeComment } from '../../../services/commentsService'

class SearchPosts extends Component {
    render() {
        return (
            <main>
                <div>
                    <div className="search">
                        <h1>Search user's posts</h1>
                        <SearchForm searchHandler={this.props.search} />
                    </div>
    
                    <PostSection 
                        posts={this.props.foundPosts.toJS()}
                        fetchStatus={this.props.fetchStatus}
                        likePostHandler={this.props.like}
                        dislikePostHandler={this.props.dislike}
                        editUserPostHandler={this.props.editUserPost}
                        deletePostHandler={this.props.delPost}
                        likeCommentHandler={this.props.likeCom}
                        dislikeCommentHandler={this.props.dislikeCom}
                        deleteCommentHandler={this.props.deleteCom}
                        currentUser={this.props.currentUser.toJS()}
                        makeCommentHandler={this.props.makeCom}
                    />
                </div>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        fetchStatus: state.systemReducer.get('fetchStatus'),
        currentUser: state.systemReducer.get('currentUser'),
        foundPosts: state.postsReducer.get('foundPosts')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        search: (data) => dispatch(searchPosts(data)),
        like: (postId) => dispatch(likePost(postId)),
        dislike: (postId) => dispatch(dislikePost(postId)),
        delPost: (postId) => dispatch(deletePost(postId)),
        editUserPost: (data, postId) => dispatch(editPost(data, postId)),
        likeCom: (_id) => dispatch(likeComment(_id)),
        dislikeCom: (_id) => dispatch(dislikeComment(_id)),
        deleteCom: (_id) => dispatch(deleteComment(_id)),
        makeCom: (data) => dispatch(makeComment(data)),
    }
}


SearchPosts.propTypes = {
    foundPosts: PropTypes.instanceOf(List),
    currentUser: PropTypes.instanceOf(Map),
    fetchStatus: PropTypes.number,
    like: PropTypes.func,
    search: PropTypes.func,
    dislike: PropTypes.func,
    editUserPost: PropTypes.func,
    delPost: PropTypes.func,
    likeCom: PropTypes.func,
    dislikeCom: PropTypes.func,
    makeCom: PropTypes.func,
    deleteCom: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPosts);
