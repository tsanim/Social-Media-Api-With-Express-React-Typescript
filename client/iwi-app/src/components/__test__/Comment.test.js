import React from 'react';
import Comment from '../CommentComponents/Comment';

import { shallow, mount } from 'enzyme';
import UserDataLink from '../UserInfoComponents/UserDataLink';
import CommentContainer from '../CommentComponents/CommentContainer';
import CommentMeta from '../CommentComponents/CommentMeta';
import DeleteModal from '../Modals/DeleteModal';
import { MemoryRouter } from 'react-router-dom';
import Modal from '../Modals/Modal';

function messageComponentShallowSetup() {
    const props = {
        comment: { likes: ['123'], creator: {}, text: '', date: '', _id: '' },
        currentUser: { _id: '123' },
        likeCommentHandler: jest.fn(),
        dislikeCommentHandler: jest.fn(),
        deleteCommentHandler: jest.fn()
    }

    const enzymeWrapper = shallow(<Comment {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

function messageComponentMountSetup() {
    const props = {
        comment: { likes: ['123'], creator: { _id: '123' }, text: '', date: '', _id: '' },
        currentUser: { _id: '123' },
        likeCommentHandler: jest.fn(),
        dislikeCommentHandler: jest.fn(),
        deleteCommentHandler: jest.fn()
    }

    const enzymeWrapper = mount(
        <MemoryRouter>
            <Comment {...props} />
        </MemoryRouter>
    )

    return {
        props,
        enzymeWrapper
    }
}

describe('Comment component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = messageComponentShallowSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render container div with class "comment"', () => {
        const { enzymeWrapper } = messageComponentShallowSetup();

        expect(enzymeWrapper.find('div.comment')).toHaveLength(1);
    });

    it('should render child figure tag with class "commentData"', () => {
        const { enzymeWrapper } = messageComponentShallowSetup();

        expect(enzymeWrapper.find('figure.commentData')).toHaveLength(1);
    });

    it('should render child UserDataLink Component', () => {
        const { enzymeWrapper } = messageComponentShallowSetup();

        expect(enzymeWrapper.find(UserDataLink)).toHaveLength(1);
    });

    it('should render child CommentContainer Component', () => {
        const { enzymeWrapper } = messageComponentShallowSetup();

        expect(enzymeWrapper.find(CommentContainer)).toHaveLength(1);
    });

    it('should render child CommentMeta component', () => {
        const { enzymeWrapper } = messageComponentShallowSetup();

        expect(enzymeWrapper.find(CommentMeta)).toHaveLength(1);
    });

    it('should render like button tag and update likesCount on button click', () => {
        const { enzymeWrapper, props } = messageComponentMountSetup();

        enzymeWrapper.find('.commentBtns').childAt(0).simulate('click');

        expect(enzymeWrapper.find(CommentMeta).prop('likesCount')).toEqual(props.comment.likes.length + 1);
    });


    it('should render button tag with class "liked" and update likesCount on click', () => {
        window.localStorage.setItem('userId', '123');

        const { enzymeWrapper, props } = messageComponentMountSetup();

        enzymeWrapper.find('.commentBtns button.liked').simulate('click');

        expect(enzymeWrapper.find(CommentMeta).prop('likesCount')).toEqual(props.comment.likes.length - 1);
    });

    it('should render Modal Component when span tag for likers is clicked', () => {
        const { enzymeWrapper } = messageComponentMountSetup();

        //find second span child of meta div and simulate click
        enzymeWrapper.find('div.meta').childAt(1).simulate('click');

        expect(enzymeWrapper.find(Modal)).toHaveLength(1);
    });

    it('should render two buttons tag when comment creator id is equal to currentUser id', () => {
        const { enzymeWrapper } = messageComponentMountSetup();

        expect(enzymeWrapper.find('.commentBtns').children()).toHaveLength(2);
    });

    it('should render DeleteModal Component when delete button is clicked', () => {
        const { enzymeWrapper } = messageComponentMountSetup();

        enzymeWrapper.find('.commentBtns').childAt(1).simulate('click');

        expect(enzymeWrapper.find(DeleteModal)).toHaveLength(1);
    });

    it('should unmount DeleteModal Component when close button is clicked', () => {
        const { enzymeWrapper } = messageComponentMountSetup();

        enzymeWrapper.find('.commentBtns').childAt(1).simulate('click');

        expect(enzymeWrapper.find(DeleteModal)).toHaveLength(1);

        enzymeWrapper.find('.modal-content span.close').simulate('click');

        expect(enzymeWrapper.find(DeleteModal)).toHaveLength(0);
    });
});