import React from 'react';
import useForms from '../../hooks/useForms';
import PropTypes from 'prop-types';

function EditFeedForm({ feedId, text, editUserPostHandler, handleShowEditForm }) {
    const { handleSubmit, handleChangeInput, inputs } = useForms((e) => {
        editUserPostHandler(inputs, feedId);
        handleShowEditForm();
    });

    return (
        <form id="editFeedForm" onSubmit={handleSubmit}>
            <textarea
                placeholder="Write something..."
                name="text"
                id="feed"
                value={inputs.text || text}
                onChange={handleChangeInput}
            />
            <input type="submit" value="SAVE" />
            <button onClick={handleShowEditForm}>Undo</button>
        </form>
    )
}

EditFeedForm.propTypes = {
    feedId: PropTypes.string,
    text: PropTypes.string,
    editUserPostHandler: PropTypes.func,
    handleShowEditForm: PropTypes.func,
}

export default EditFeedForm;