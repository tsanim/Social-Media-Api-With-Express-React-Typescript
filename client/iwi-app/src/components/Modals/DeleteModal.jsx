import React from 'react';
import PropTypes from 'prop-types';

function DeleteModal({ handleClose, deleteFunc, feedId, isPost }) {
    return (
        <div>
            {/* The Modal */}
            <div id="myModal" className="modal">
                {/* Modal content */}
                <div className="modal-content">
                    <span onClick={handleClose} className="close">×</span>
                    <p>{`Do you really want to delete this ${isPost ? 'post' : 'comment'}?`}</p>
                    <button onClick={() => deleteFunc(feedId)} className="btn info">Yes</button>
                    <button onClick={handleClose} className="btn default">No</button>
                </div>
            </div>
        </div>
    )
}

DeleteModal.propTypes = {
    handleClose: PropTypes.func,
    deleteFunc: PropTypes.func,
    feedId: PropTypes.string,
    isPost: PropTypes.bool,
}

export default DeleteModal;