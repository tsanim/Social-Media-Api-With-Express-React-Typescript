import React from 'react';
import useForms from '../../hooks/useForms';
import PropTypes from 'prop-types';
import EditFeedFormProps from '../../interfaces/Components/Forms/EditFeedFormProps.interface';

function EditFeedForm({ feedId, text, editUserPostHandler, handleShowEditForm }: EditFeedFormProps) {
    const { handleSubmit, handleChangeInput, inputs } = useForms(() => {
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