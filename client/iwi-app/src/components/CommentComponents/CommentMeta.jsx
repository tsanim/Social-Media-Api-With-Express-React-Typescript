import React from 'react';
import calcTime from '../../utils/calcTime';
import PropTypes from 'prop-types';

function CommentMeta(props) {
    return (
        <div className="meta">
            <span className="date">{calcTime(props.date)}</span>
            <span onClick={props.handleShowLikesModal} >{props.likesCount} likes</span>
        </div>
    )
}

CommentMeta.propTypes = {
    date: PropTypes.string,
    likesCount: PropTypes.number,
    handleShowLikesModal: PropTypes.func,
    testProp: PropTypes.string
}

export default CommentMeta;