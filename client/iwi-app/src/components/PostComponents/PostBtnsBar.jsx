import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

function PostBtnsBar(props) {
    return (
        <div className={props.btnsDivClassName}>
            <div className="left">
                {
                    props.isLiked
                        ? <button onClick={props.handleDisLikePost} className="liked"><FontAwesomeIcon icon={faHeart} /></button>
                        : <button onClick={props.handleLikePost}><FontAwesomeIcon icon={faHeart} /></button>
                }
                <button style={(props.showComments ? { color: "#8AAAE5" } : { color: 'inherit' })} onClick={props.handleShowComments}><FontAwesomeIcon icon={faComment} /></button>
            </div>

            <div className="right">
                {/* Check Post username whether is equal to logged in username so button for delete and edit can show */}
                {
                    (props.creatorId === localStorage.getItem('userId'))
                        ? (
                            <div>
                                <button onClick={props.handleShowModal}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                <button onClick={props.handleShowEditForm}><FontAwesomeIcon icon={faEdit} /></button>
                            </div>
                        )
                        : (<div>
                            {
                                localStorage.getItem('role') === 'Admin'
                                    ? <button onClick={props.handleShowModal}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    : null
                            }
                        </div>)
                }
            </div>

        </div>
    )
}

PostBtnsBar.propTypes = {
    btnsDivClassName: PropTypes.string,
    isLiked: PropTypes.bool,
    handleDisLikePost: PropTypes.func,
    handleLikePost: PropTypes.func,
    showComments: PropTypes.bool,
    handleShowComments: PropTypes.func,
    creatorId: PropTypes.string,
    handleShowModal: PropTypes.func,
    handleShowEditForm: PropTypes.func,
}

export default PostBtnsBar;