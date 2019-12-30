import React from 'react';
import PostMeta from '../PostComponents/PostMeta';
import CommentsList from '../CommentComponents/CommentsList';

import { shallow } from 'enzyme';

function postMetaComponentSetup() {
    const props = {
        handleShowLikesModal: jest.fn(),
        handleShowComments: jest.fn(),
        likesCount: 0,
        likesString: '',
        comments: [],
        areCommentsShown: true,
        postId: '',
        currentUser: {},
        likeCommentHandler: jest.fn(),
        dislikeCommentHandler: jest.fn(),
        deleteCommentHandler: jest.fn(),
        makeCommentHandler: jest.fn(),
    }

    const enzymeWrapper = shallow(<PostMeta {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('PostMeta component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = postMetaComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div tag with class "postMeta"', () => {
        const { enzymeWrapper } = postMetaComponentSetup();

        expect(enzymeWrapper.find('div.postMeta')).toHaveLength(1);
    });

    it('should render div tag with class "meta"', () => {
        const { enzymeWrapper } = postMetaComponentSetup();

        expect(enzymeWrapper.find('div.meta')).toHaveLength(1);
    });

    it('should render a button tag with class "likes"', () => {
        const { enzymeWrapper } = postMetaComponentSetup();

        expect(enzymeWrapper.find('button.likes')).toHaveLength(1);
    });

    it('should render CommentsList Component when areCommentsShown prop is true', () => {
        const { enzymeWrapper } = postMetaComponentSetup();

        expect(enzymeWrapper.find(CommentsList)).toHaveLength(1);
    });
});
