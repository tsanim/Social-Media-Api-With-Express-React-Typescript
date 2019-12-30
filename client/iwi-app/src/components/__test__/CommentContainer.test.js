import React from 'react';
import CommentContainer from '../CommentComponents/CommentContainer';

import { shallow } from 'enzyme';

function commentContainerComponentSetup() {
    const props = {
        text: '',
        isLiked: true,
        currentUser: { _id: '123' },
        commentCreator: { _id: '123' },
        handleDisLikeComment: jest.fn(),
        handleLikeComment: jest.fn(),
        handleShowModal: jest.fn()
    }

    const enzymeWrapper = shallow(<CommentContainer {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('CommentContainer component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = commentContainerComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div tag with class "commentContainer"', () => {
        const { enzymeWrapper } = commentContainerComponentSetup();


        expect(enzymeWrapper.find('div.commentContainer')).toHaveLength(1);
    });

    it('should render div tag with class "commentBtns"', () => {
        const { enzymeWrapper } = commentContainerComponentSetup();

        expect(enzymeWrapper.find('div.commentBtns')).toHaveLength(1);
    });

    it('should render div tag with class "commentBtns"', () => {
        const { enzymeWrapper } = commentContainerComponentSetup();

        expect(enzymeWrapper.find('div.commentBtns')).toHaveLength(1);
    });

    it('should render 3 button tags if isLiked is true and currentUser id is equal to commentCreator id', () => {
        const { enzymeWrapper } = commentContainerComponentSetup();

        expect(enzymeWrapper.find('button')).toHaveLength(2);
    });
});