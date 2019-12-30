import React from 'react';
import { shallow } from 'enzyme';

import SearchForm from '../Forms/SearchForm';

function searchFormComponentSetup() {
    const props = {
        searchHandler: jest.fn(),
    }

    const enzymeWrapper = shallow(<SearchForm {...props} />)

    return {
        props,
        enzymeWrapper
    }
}


describe('SearchForm Component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = searchFormComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render container form tag with id "searchForm"', () => {
        const { enzymeWrapper } = searchFormComponentSetup();
        
        expect(enzymeWrapper.find('form#searchForm')).toHaveLength(1);
    });

    it('should render input with type search ', () => {
        const { enzymeWrapper } = searchFormComponentSetup();
        
        expect(enzymeWrapper.find('input').prop('type')).toEqual('search');
    });

    it('should render input with name "searchText"', () => {
        const { enzymeWrapper } = searchFormComponentSetup();
        
        expect(enzymeWrapper.find('input').prop('name')).toEqual('searchText');
    });

    it('should render input with onChange event', () => {
        const { enzymeWrapper } = searchFormComponentSetup();
        
        expect(enzymeWrapper.find('input').prop('onChange')).toBeDefined();
    });

    it('should test if user text is echoed', () => {
        const { enzymeWrapper } = searchFormComponentSetup();

        const mockedEvent = {
            target: { value: 'hello', name: 'searchText' },
            persist: jest.fn()
        };

        enzymeWrapper.find('input').simulate('change', mockedEvent);

        expect(enzymeWrapper.find('input').props().value).toEqual('hello');
    });

    it('should test if submit event when form is submitted', () => {
        const { enzymeWrapper, props } = searchFormComponentSetup();

        const mockedEvent = {
            preventDefault: () => {},
        };

        enzymeWrapper.find('form').simulate('submit', mockedEvent);

        expect(props.searchHandler).toHaveBeenCalledTimes(1);
    });
});
