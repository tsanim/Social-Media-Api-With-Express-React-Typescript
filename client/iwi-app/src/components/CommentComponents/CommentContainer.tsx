import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import CommentContainerProps from '../../interfaces/Components/CommentComponents/CommentContainerProps.interface';

function CommentContainer(props: CommentContainerProps) {
    return (
        <div className="commentContainer">
            {/* If edit form is shown , both comment's text and buttons are not shown */}
            <p>{props.text} </p>
            <div className="commentBtns">
                {
                    props.isLiked
                        ? <button onClick={props.handleDislikeComment as () => void} className="liked"><FontAwesomeIcon icon={faHeart} /></button>
                        : <button onClick={props.handleLikeComment as () => void}><FontAwesomeIcon icon={faHeart} /></button>
                }

                {
                    (props.currentUser._id ? props.currentUser._id : props.currentUser.id) === props.commentCreator._id
                        ? <button onClick={props.handleShowModal} ><FontAwesomeIcon icon={faTrash} /></button>
                        : null
                }
            </div>
        </div>
    )
}

CommentContainer.propTypes = {
    text: PropTypes.string,
    isLiked: PropTypes.bool,
    currentUser: PropTypes.object,
    commentCreator: PropTypes.object,
    handleDisLikeComment: PropTypes.func,
    handleLikeComment: PropTypes.func,
    handleShowModal: PropTypes.func
}

export default CommentContainer;