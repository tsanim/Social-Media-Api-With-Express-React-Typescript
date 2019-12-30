import React from 'react';
import DeleteModal from '../Modals/DeleteModal';

import { shallow } from 'enzyme';

function deleteModalComponentSetup() {
    const props = {
        handleClose: jest.fn(),
        deleteFunc: jest.fn(),
        feedId: '',
        isPost: true,
    }

    const enzymeWrapper = shallow(<DeleteModal {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('DeleteModal component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = deleteModalComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render 3 div tags', () => {
        const { enzymeWrapper } = deleteModalComponentSetup();

        expect(enzymeWrapper.find('div')).toHaveLength(3);
    });

    it('should render div tag with class "modal"', () => {
        const { enzymeWrapper } = deleteModalComponentSetup();

        expect(enzymeWrapper.find('div.modal')).toHaveLength(1);
    });

    it('should render div tag with class "modal-content"', () => {
        const { enzymeWrapper } = deleteModalComponentSetup();

        expect(enzymeWrapper.find('div.modal-content')).toHaveLength(1);
    });

    it('should render span tag with class "close" and onClikc prop', () => {
        const { enzymeWrapper } = deleteModalComponentSetup();

        expect(enzymeWrapper.find('span.close').prop('onClick')).toBeDefined();
    });

    it('should render p tag with text "Do you really want to delete this post?"', () => {
        const { enzymeWrapper } = deleteModalComponentSetup();

        expect(enzymeWrapper.find('p').text()).toEqual('Do you really want to delete this post?');
    });

    it('should render 2 button tags with onClick prop', () => {
        const { enzymeWrapper } = deleteModalComponentSetup();

        expect(enzymeWrapper.find('button')).toHaveLength(2);
        expect(enzymeWrapper.find('button.info').prop('onClick')).toBeDefined();
        expect(enzymeWrapper.find('button.default').prop('onClick')).toBeDefined();
    });

    it('should call deleteFunc when button is clicked', () => {
        const { enzymeWrapper, props } = deleteModalComponentSetup();

        enzymeWrapper.find('button.info').simulate('click');

        expect(props.deleteFunc).toHaveBeenCalled();
    });
});