import React from 'react';
import PostBtnsBar from '../PostComponents/PostBtnsBar';

import { shallow } from 'enzyme';

function postBtnsBarComponentSetup() {
    const props = {
        btnsDivClassName: '',
        isLiked: true,
        handleDisLikePost: jest.fn(),
        handleLikePost: jest.fn(),
        showComments: false,
        handleShowComments: jest.fn(),
        creatorId: '123',
        handleShowModal: jest.fn(),
        handleShowEditForm: jest.fn(),
    }

    window.localStorage.setItem('userId', '123');

    const enzymeWrapper = shallow(<PostBtnsBar {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('PostBtnsBar component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = postBtnsBarComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render 4 div tags', () => {
        const { enzymeWrapper } = postBtnsBarComponentSetup();

        expect(enzymeWrapper.find('div')).toHaveLength(4);
    });

    it('should render 4 buttons', () => {
        const { enzymeWrapper } = postBtnsBarComponentSetup();

        expect(enzymeWrapper.find('button')).toHaveLength(4);
    });
});
