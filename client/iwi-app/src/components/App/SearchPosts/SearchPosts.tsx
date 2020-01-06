import React, { Component } from 'react';
import PostSection from '../../PostComponents/PostsSection';
import SearchForm from '../../Forms/SearchForm';
import PropTypes from 'prop-types';
import {List, Map} from "immutable";

import { SearchPostsProps, connector } from '../../../interfaces/Components/SearchPosts/SearchPostsProps.interface';

class SearchPosts extends Component<SearchPostsProps> {
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

// SearchPosts.propTypes = {
//     foundPosts: PropTypes.instanceOf(List),
//     currentUser: PropTypes.instanceOf(Map),
//     fetchStatus: PropTypes.number,
//     like: PropTypes.func,
//     search: PropTypes.func,
//     dislike: PropTypes.func,
//     editUserPost: PropTypes.func,
//     delPost: PropTypes.func,
//     likeCom: PropTypes.func,
//     dislikeCom: PropTypes.func,
//     makeCom: PropTypes.func,
//     deleteCom: PropTypes.func,
// };

export default connector(SearchPosts);
