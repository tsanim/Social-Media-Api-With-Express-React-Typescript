import React from 'react';
import Modal from '../Modals/Modal';

import { shallow } from 'enzyme';

function modalComponentSetup() {
    const props = {
        handleClose: jest.fn(),
        modalHeaderName: 'header name',
        users: [{ _id: '123' }],
    }

    const enzymeWrapper = shallow(<Modal {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Modal component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = modalComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render 3 div tags', () => {
        const { enzymeWrapper } = modalComponentSetup();

        expect(enzymeWrapper.find('div')).toHaveLength(3);
    });

    it('should render div tag with class "modal"', () => {
        const { enzymeWrapper } = modalComponentSetup();

        expect(enzymeWrapper.find('div.modal')).toHaveLength(1);
    });

    it('should render div tag with class "modal-content"', () => {
        const { enzymeWrapper } = modalComponentSetup();

        expect(enzymeWrapper.find('div.modal-content')).toHaveLength(1);
    });

    it('should render div tag with class "modal-header"', () => {
        const { enzymeWrapper } = modalComponentSetup();

        expect(enzymeWrapper.find('div.modal-header')).toHaveLength(1);
    });

    it('should render span tag with class "close" and onClikc prop', () => {
        const { enzymeWrapper } = modalComponentSetup();

        expect(enzymeWrapper.find('span.close').prop('onClick')).toBeDefined();
    });

    it('should render ul tag', () => {
        const { enzymeWrapper } = modalComponentSetup();

        expect(enzymeWrapper.find('ul')).toHaveLength(1);
    });

    it('should render h2 tag with text equal to modalHeaderName prop', () => {
        const { enzymeWrapper } = modalComponentSetup();

        expect(enzymeWrapper.find('h2').text()).toEqual('header name');
    });

    it('should render ul li items equal to users array prop', () => {
        const { enzymeWrapper, props } = modalComponentSetup();

        expect(enzymeWrapper.find('ul').children()).toHaveLength(props.users.length);
    });

    it('should render ul one li item when users array prop is empty', () => {
        const { enzymeWrapper, props } = modalComponentSetup();

        enzymeWrapper.setProps({ users: [] });

        expect(enzymeWrapper.find('ul').children()).toHaveLength(1);
        expect(enzymeWrapper.find('ul').childAt(0).text()).toEqual(`No ${props.modalHeaderName}`);
    });
});