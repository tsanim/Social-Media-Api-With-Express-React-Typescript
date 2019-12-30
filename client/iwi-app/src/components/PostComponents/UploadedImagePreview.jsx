import React from 'react';
import PropTypes from 'prop-types';

function UploadedImagePreview(props) {
    return (
        <div className="uploadedImgPreview">
            {
                props.imagePreviewUrl !== '' ? <React.Fragment>
                    <img id="previewImg" src={props.imagePreviewUrl} alt="uploadedImg" />
                    <div onClick={props.handlePreviewImgClose} className="overlay"><span>x</span></div>
                </React.Fragment> : null
            }
        </div>
    )
}

UploadedImagePreview.propTypes = {
    imagePreviewUrl: PropTypes.string,
    handlePreviewImgClose: PropTypes.func
}

export default UploadedImagePreview;