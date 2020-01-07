import React, { useState, useEffect } from 'react';
import DeleteModal from '../Modals/DeleteModal';
import Modal from '../Modals/Modal';
import UserDataLink from '../UserInfoComponents/UserDataLink';
import PropTypes from 'prop-types';
import CommentContainer from './CommentContainer';
import CommentMeta from './CommentMeta';

import CommentsService from '../../services/CommentsService';
import CommentProps from '../../interfaces/Components/CommentComponents/CommentProps.interface';
import { PlainUser } from '../../interfaces/User/User.interface';

function Comment({ comment, currentUser, likeCommentHandler, dislikeCommentHandler, deleteCommentHandler }: CommentProps) {
    const { creator: commentCreator, text, date, likes, _id } = comment;

    //hook for question modal about deleting
    const [showDeleteModal, setShowModal] = useState(false);
    //hook for showing likes people
    const [showLikesPeopleModal, setShowLikesPeopleModal] = useState(false);
    //hook for handle like post 
    const [likesCount, setlikesCount] = useState(likes.length);
    //hook for handle liked/not liked
    const initCommentIsLiked = (likes as string[]).includes(localStorage.getItem('userId'));
    const [isLiked, setIsLiked] = useState(initCommentIsLiked);
    //hook for likers
    const [likers, setLikers] = useState([]);

    /*
            TODO: Add AbortController() to useEffect functions to stop request when component is unmount
    */

    //when component did mound , fetched the likers of the comment for showing them in the modal
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        CommentsService.fetchCommentsLikes(_id, (data) => {
            setLikers(() => data.likes);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLikeComment = () => {
        setlikesCount((likesCount: number) => likesCount + 1);
        setIsLiked((isLiked: boolean) => !isLiked);
        likeCommentHandler(_id);

        //correct likers like add logged in user in likers array
        setLikers((likers: PlainUser[]) => [...likers, currentUser]);
    }

    const handleDisLikeComment = () => {
        setlikesCount((likesCount: number) => likesCount - 1);
        setIsLiked((isLiked: boolean) => !isLiked);
        dislikeCommentHandler(_id);

        //correct likers like remove logged in user from likers array
        setLikers((likers: PlainUser[]) => {
            likers = likers.filter(l => l._id !== currentUser._id)
            return likers;
        });
    }

    const handleShowModal = () => {
        setShowModal(() => true);
    }

    const handleShowLikesModal = () => {
        setShowLikesPeopleModal(() => true);
    }

    const handleClose = () => {
        setShowModal(() => false);
        setShowLikesPeopleModal(() => false);

    }

    return (
        <div className="comment">
            <figure className="commentData">
                <UserDataLink user={commentCreator as PlainUser} />
            </figure>
            <CommentContainer
                text={text}
                isLiked={isLiked}
                handleDisLikeComment={handleDisLikeComment}
                handleLikeComment={handleLikeComment}
                handleShowModal={handleShowModal}
                currentUser={currentUser}
                commentCreator={commentCreator as PlainUser}
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