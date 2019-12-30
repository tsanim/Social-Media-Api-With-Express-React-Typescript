import React from 'react';
import CommentsList from '../CommentComponents/CommentsList';
import PropTypes from 'prop-types';

function PostMeta(props) {
    return (
        <div className="postMeta">
            <div className="meta">
                <button onClick={props.handleShowLikesModal} className="likes">{props.likesCount + ' ' + props.likesString}</button>
                <span onClick={props.handleShowComments}>{props.comments.length} Comments</span>
            </div>

            {
                props.areCommentsShown
                    ? <CommentsList
                        comments={props.comments}
                        postId={props.postId}
                        currentUser={props.currentUser}
                        likeCommentHandler={props.likeCommentHandler}
                        dislikeCommentHandler={props.dislikeCommentHandler}
                        deleteCommentHandler={props.deleteCommentHandler}
                        makeCommentHandler={props.makeCommentHandler}
                    />
                    : null
            }

        </div>
    )
}

PostMeta.propTypes = {
    handleShowLikesModal: PropTypes.func,
    handleShowComments: PropTypes.func,
    likesCount: PropTypes.number,
    likesString: PropTypes.string,
    comments: PropTypes.array,
    areCommentsShown: PropTypes.bool,
    postId: PropTypes.string,
    currentUser: PropTypes.object,
    likeCommentHandler: PropTypes.func,
    dislikeCommentHandler: PropTypes.func,
    deleteCommentHandler: PropTypes.func,
    makeCommentHandler: PropTypes.func,
}

export default PostMeta;