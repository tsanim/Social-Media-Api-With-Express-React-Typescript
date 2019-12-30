import React from 'react';
import Comment from './Comment';
import CommentForm from '../Forms/CommentForm';
import PropTypes from 'prop-types';

function CommentsList({ comments, currentUser, postId, likeCommentHandler, dislikeCommentHandler, deleteCommentHandler, makeCommentHandler }) {
    return (
        <section className="comments">
            <h3>Comments</h3>
            <ul>
                {
                    comments.length > 0
                        ? comments.map(c => (<li key={c._id}>
                            <Comment
                                comment={c}
                                currentUser={currentUser}
                                likeCommentHandler={likeCommentHandler}
                                dislikeCommentHandler={dislikeCommentHandler}
                                deleteCommentHandler={deleteCommentHandler}
                            />
                        </li>))
                        : null
                }
            </ul>
            <CommentForm 
                postId={postId} 
                makeCommentHandler={makeCommentHandler}
            />
        </section>
    )
}

CommentsList.propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.string,
    currentUser: PropTypes.object,
    likeCommentHandler: PropTypes.func,
    makeCommentHandler: PropTypes.func,
    dislikeCommentHandler: PropTypes.func,
    deleteCommentHandler: PropTypes.func
}


export default CommentsList;