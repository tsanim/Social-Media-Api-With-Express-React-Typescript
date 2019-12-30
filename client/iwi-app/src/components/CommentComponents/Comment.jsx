import React, { useState, useEffect } from 'react';
import DeleteModal from '../Modals/DeleteModal';
import Modal from '../Modals/Modal';
import UserDataLink from '../UserInfoComponents/UserDataLink';
import PropTypes from 'prop-types';
import CommentContainer from './CommentContainer';
import CommentMeta from './CommentMeta';
import { fetchCommentsLikes } from '../../services/commentsService';

function Comment({ comment, currentUser, likeCommentHandler, dislikeCommentHandler, deleteCommentHandler }) {
    const { creator: commentCreator, text, date, likes, _id } = comment;

    //hook for question modal about deleting
    const [showDeleteModal, setShowModal] = useState(false);
    //hook for showing likes people
    const [showLikesPeopleModal, setShowLikesPeopleModal] = useState(false);
    //hook for handle like post 
    const [likesCount, setlikesCount] = useState(likes.length);
    //hook for handle liked/not liked
    const initCommentIsLiked = likes.includes(localStorage.getItem('userId'))
    const [isLiked, setIsLiked] = useState(initCommentIsLiked);
    //hook for likers
    const [likers, setLikers] = useState([]);

    /*
            TODO: Add AbortController() to useEffect functions to stop request when component is unmount
    */

    //when component did mound , fetched the likers of the comment for showing them in the modal
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchCommentsLikes(_id, (data) => {
            setLikers(() => data.likes);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLikeComment = (e) => {
        setlikesCount((likesCount) => likesCount + 1);
        setIsLiked((isLiked) => !isLiked);
        likeCommentHandler(_id);

        //correct likers like add logged in user in likers array
        setLikers((likers) => [...likers, currentUser]);
    }

    const handleDisLikeComment = (e) => {
        setlikesCount((likesCount) => likesCount - 1);
        setIsLiked((isLiked) => !isLiked);
        dislikeCommentHandler(_id);

        //correct likers like remove logged in user from likers array
        setLikers((likers) => {
            likers = likers.filter(l => l._id !== currentUser._id)
            return likers;
        });
    }

    const handleShowModal = (e) => {
        setShowModal((showDeleteModal) => true);
    }

    const handleShowLikesModal = (e) => {
        setShowLikesPeopleModal((showLikesPeopleModal) => true);
    }

    const handleClose = (e) => {
        setShowModal((showDeleteModal) => false);
        setShowLikesPeopleModal((showLikesPeopleModal) => false);

    }

    return (
        <div className="comment">
            <figure className="commentData">
                <UserDataLink user={commentCreator} />
            </figure>
            <CommentContainer
                text={text}
                isLiked={isLiked}
                handleDisLikeComment={handleDisLikeComment}
                handleLikeComment={handleLikeComment}
                handleShowModal={handleShowModal}
                currentUser={currentUser}
                commentCreator={commentCreator}
            />

            <CommentMeta
                date={date}
                handleShowLikesModal={handleShowLikesModal}
                likesCount={likesCount}
            />

            {
                showDeleteModal
                    ? <DeleteModal
                        isPost={false}
                        feedId={_id}
                        deleteFunc={deleteCommentHandler}
                        handleClose={handleClose} />
                    : null
            }

            {/* Modal for likers */}
            {
                showLikesPeopleModal ? <Modal handleClose={handleClose} modalHeaderName={'Likes'} users={likers} /> : null
            }
        </div >
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
    currentUser: PropTypes.object,
    likeCommentHandler: PropTypes.func,
    dislikeCommentHandler: PropTypes.func,
    deleteCommentHandler: PropTypes.func
}

export default Comment;