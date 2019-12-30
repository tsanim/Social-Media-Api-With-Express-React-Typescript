import React from 'react';
import Post from './Post';
import sortByDate from '../../utils/sortByDate';
import WithLoader from '../HOCS/WithLoader';
import PropTypes from 'prop-types';

function PostsSection(props) {
    return (
        <section id="posts">
            {props.posts.length > 0
                ? (
                    props.posts
                        .sort(sortByDate)
                        .map(p => {
                            return (<article key={p._id} className="post">
                                <Post
                                    post={p}
                                    currentUser={props.currentUser}
                                    likePostHandler={props.likePostHandler}
                                    dislikePostHandler={props.dislikePostHandler}
                                    deletePostHandler={props.deletePostHandler}
                                    editUserPostHandler={props.editUserPostHandler}
                                    likeCommentHandler={props.likeCommentHandler}
                                    dislikeCommentHandler={props.dislikeCommentHandler}
                                    deleteCommentHandler={props.deleteCommentHandler}
                                    makeCommentHandler={props.makeCommentHandler}
                                />
                            </article>
                            )
                        })
                )
                : <p>There no posts!</p>
            }
        </section>
    )
}

Post.propTypes = {
    posts: PropTypes.array,
    currentUser: PropTypes.object,
    likePostHandler: PropTypes.func,
    dislikePostHandler: PropTypes.func,
    deletePostHandler: PropTypes.func,
    likeCommentHandler: PropTypes.func,
    dislikeCommentHandler: PropTypes.func,
    deleteCommentHandler: PropTypes.func,
    makeCommentHandler: PropTypes.func,
    editUserPostHandler: PropTypes.func,
}

export default WithLoader(PostsSection);