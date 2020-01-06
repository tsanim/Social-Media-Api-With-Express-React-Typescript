import React from 'react';
import useForms from '../../hooks/useForms';
import PropTypes from 'prop-types';
import SearchFormProps from '../../interfaces/Components/Forms/SearchFormProps.interface';
import SearchData from '../../interfaces/SearchData.interface';

function SearchForm({ searchHandler }: SearchFormProps) {
    const { handleSubmit, handleChangeInput, inputs } = useForms(() => {
        searchHandler(inputs as SearchData);
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
