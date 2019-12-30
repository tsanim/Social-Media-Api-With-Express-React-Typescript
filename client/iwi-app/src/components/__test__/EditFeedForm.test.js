import React from 'react';
import { shallow } from 'enzyme';

import EditFeedForm from '../Forms/EditFeedForm';

function editFeedFormComponentSetup() {
    const props = {
        feedId: '',
        text: undefined,
        editUserPostHandler: jest.fn(),
        handleShowEditForm: jest.fn(),
    }

    const enzymeWrapper = shallow(<EditFeedForm {...props} />)

    return {
        props,
        enzymeWrapper
    }
}


describe('EditFeedForm Component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = editFeedFormComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render form tag with id "editFeedForm"', () => {
        const { enzymeWrapper } = editFeedFormComponentSetup();

        expect(enzymeWrapper.find('form#editFeedForm')).toHaveLength(1);
    });

    it('should render textarea tag', () => {
        const { enzymeWrapper } = editFeedFormComponentSetup();

        expect(enzymeWrapper.find('textarea')).toHaveLength(1);
    });

    it('should render textarea tag with name prop "text"', () => {
        const { enzymeWrapper } = editFeedFormComponentSetup();

        expect(enzymeWrapper.find('textarea').prop('name')).toEqual('text');
    });

    it('should render textarea tag with onChange prop', () => {
        const { enzymeWrapper } = editFeedFormComponentSetup();

        expect(enzymeWrapper.find('textarea').prop('onChange')).toBeDefined();
    });

    it('should render input tag with type "submit"', () => {
        const { enzymeWrapper } = editFeedFormComponentSetup();

        expect(enzymeWrapper.find('input[type="submit"]')).toHaveLength(1);
    });

    it('should render a button tag', () => {
        const { enzymeWrapper } = editFeedFormComponentSetup();

        expect(enzymeWrapper.find('button')).toHaveLength(1);
    });

    it('should test if user text is echoed', () => {
        const { enzymeWrapper } = editFeedFormComponentSetup();

        const mockedEvent = {
            target: { value: 'hello', name: 'text' },
            persist: jest.fn()
        };

        enzymeWrapper.find('textarea').simulate('change', mockedEvent);

        expect(enzymeWrapper.find('textarea').prop('value')).toEqual('hello');
    });

    it('should test if submit event when form is submitted', () => {
        const { enzymeWrapper, props } = editFeedFormComponentSetup();

        const mockedEvent = {
            preventDefault: () => {},
        };

        enzymeWrapper.find('form').simulate('submit', mockedEvent);

        expect(props.editUserPostHandler).toHaveBeenCalledTimes(1);
        expect(props.handleShowEditForm).toHaveBeenCalledTimes(1);
    });
});
