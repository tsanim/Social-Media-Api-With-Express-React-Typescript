import React from 'react';
import useForms from '../../hooks/useForms';
import PropTypes from 'prop-types';

function SearchForm({ searchHandler }) {
    const { handleSubmit, handleChangeInput, inputs } = useForms((e) => {
        searchHandler(inputs);
    })

    return (
        <form id="searchForm" onSubmit={handleSubmit}>
            <input
                type="search"
                placeholder="Search..."
                name="searchText"
                value={inputs.searchText || ''}
                onChange={handleChangeInput}
            />
        </form>
    )
}

SearchForm.propTypes = {
    searchHandler: PropTypes.func,
}

export default SearchForm;
