import React, { useState, useEffect } from 'react';
import calcTime from '../../utils/calcTime';
import DeleteModal from '../Modals/DeleteModal';
import EditFeedForm from '../Forms/EditFeedForm';
import URI from '../../config/config';
import Modal from '../Modals/Modal';
import UserDataLink from '../UserInfoComponents/UserDataLink';
import PostBtnsBar from './PostBtnsBar';
import PostMeta from './PostMeta';
import httpRequest from '../../utils/httpRequest';
import PropTypes from 'prop-types';

function Post({ post, currentUser, likePostHandler, dislikePostHandler, deletePostHandler, likeCommentHandler, dislikeCommentHandler, deleteCommentHandler, makeCommentHandler, editUserPostHandler }) {
    const { creator, _id, date, text, imageId, likes, comments } = post;

    //hook for question modal about deleting
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    //hook for showing edit form
    const [showForm, setShowForm] = useState(false);
    //hook for showing comments section and comment form
    const [areCommentsShown, setShowComments] = useState(false);
    //hook for showing likes people
    const [showLikesPeopleModal, setShowLikesPeopleModal] = useState(false);
    //hook for handle like post 
    const [likers, setLikers] = useState([]);
    const [likesCount, setLikes] = useState(likes.length);
    //hook for handle liked/not liked
    const initPostLiked = likes.findIndex(like => like._id === localStorage.getItem('userId')) >= 0
    const [isLiked, setIsLiked] = useState(initPostLiked);

    //elements styles against post info
    const textDivClassName = (imageId ? 'postText' : 'postText text-only-large');
    const btnsDivClassName = (imageId ? "buttons" : "buttons text-only-small");
    const likesString = (likesCount === 1 ? 'like' : 'likes');

    const handleLikePost = (e) => {
        setLikes((likesCount) => likesCount + 1);
        setIsLiked((isLiked) => !isLiked);
        setLikers((likers) => [...likers, currentUser]);
        likePostHandler(_id);
    }

    const handleDisLikePost = (e) => {
        setLikes((likesCount) => likesCount - 1);
        setIsLiked((isLiked) => !isLiked);
        dislikePostHandler(_id);

        //correct likers like remove logged in user from likers array
        setLikers((likers) => {
            likers = likers.filter(l => l._id !== (currentUser._id ? currentUser._id : currentUser.id))
            return likers;
        });
    }

    const handleShowModal = (e) => {
        setShowDeleteModal((showDeleteModal) => true);
    }

    const handleShowLikesModal = (e) => {
        setShowLikesPeopleModal((showLikesPeopleModal) => true);
    }

    const handleShowEditForm = (e) => {
        setShowForm((showForm) => !showForm);
    }

    const handleClose = (e) => {
        setShowDeleteModal((showDeleteModal) => false);
        setShowLikesPeopleModal(() => false);
    }

    const handleShowComments = (e) => {
        setShowComments((areCommentsShown) => !areCommentsShown);
    }

    const fetchLikes = async () => {
        const options = {
            method: 'get',
            url: `${URI}/feed/posts/likes/${_id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            onSuccess: (data) => {
                setLikers(() => data.likes);
            },
            onError: (error) => {
                console.log(error);
            }
        }

        httpRequest(options);
    }

    /*
        TODO: Add AbortController() to useEffect functions to stop request when component is unmount
    */

    //when component did mound , fetched the likers of the comment for showing them in the modal
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        fetchLikes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="meta">
                <div>
                    <figure className="userInfo">
                        <UserDataLink user={post.creator} />
                    </figure>
                </div>
                <span className="date">{calcTime(date)}</span>
            </div>

            {/* If text is empty, dont show the paragraph */}
            {
                text === ''
                    ? null
                    : (<div className={textDivClassName}>
                        {
                            showForm ? <EditFeedForm
                                feedId={_id}
                                text={text}
                                editUserPostHandler={editUserPostHandler}
                                handleShowEditForm={handleShowEditForm}
                            />
                                : <p>{text}</p>
                        }
                    </div>)
            }

            {
                imageId
                    ? (<figure>
                        <img className="postPic" src={`${URI}/feed/image/${imageId}`} alt="postPicture" />
                    </figure>)
                    : null
            }

            <PostBtnsBar
                btnsDivClassName={btnsDivClassName}
                isLiked={isLiked}
                areCommentsShown={areCommentsShown}
                creatorId={creator._id}
                handleDisLikePost={handleDisLikePost}
                handleLikePost={handleLikePost}
                handleShowComments={handleShowComments}
                handleShowModal={handleShowModal}
                handleShowEditForm={handleShowEditForm}
            />

            <PostMeta
                handleShowLikesModal={handleShowLikesModal}
                handleShowComments={handleShowComments}
                comments={comments}
                likesCount={likesCount}
                likesString={likesString}
                areCommentsShown={areCommentsShown}
                postId={_id}
                currentUser={currentUser}
                likeCommentHandler={likeCommentHandler}
                dislikeCommentHandler={dislikeCommentHandler}
                deleteCommentHandler={deleteCommentHandler}
                makeCommentHandler={makeCommentHandler}
            />


            {
                showDeleteModal ? <DeleteModal isPost={true} feedId={_id} deleteFunc={deletePostHandler} handleClose={handleClose} /> : null
            }

            {/* Modal for likers */}
            {
                showLikesPeopleModal ? <Modal handleClose={handleClose} modalHeaderName={'Likes'} users={likers} /> : null
            }
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object,
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

export default Post;
