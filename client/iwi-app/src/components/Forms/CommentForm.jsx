import React from 'react';
import useForms from '../../hooks/useForms';
import { wrapComponent } from 'react-snackbar-alert';
import PropTypes from 'prop-types';

export function CommentForm({ postId, makeCommentHandler, createSnackbar }) {
    const { handleSubmit, handleChangeInput, inputs } = useForms((e) => {

        //check for empty text and send message to user
        if (inputs.text === '' || !inputs.text) {
            createSnackbar({
                message: 'You can not make comment without text!',
                timeout: 3000,
            });
        } else {
            makeCommentHandler({ ...inputs, postId })
        }
    });

    return (
        <form className="commentForm" onSubmit={handleSubmit}>
            <textarea
                placeholder="Write a comment..."
                name="text"
                id="comment"
                value={inputs.text || ''}
                onChange={handleChangeInput}
            />
            <input disabled={inputs.text === '' || !inputs.text} type="submit" value="Comment" />
        </form>
    )
}

CommentForm.propTypes = {
    postId: PropTypes.string,
    makeCommentHandler: PropTypes.func,
    createSnackbar: PropTypes.func
}

export default wrapComponent(CommentForm);
