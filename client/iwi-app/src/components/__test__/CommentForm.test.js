import React from 'react';
import { shallow } from 'enzyme';

import { CommentForm } from '../Forms/CommentForm';

function commentFormComponentSetup() {
    const props = {
        postId: '',
        makeCommentHandler: jest.fn(),
        createSnackbar: jest.fn()
    }

    const enzymeWrapper = shallow(<CommentForm {...props} />)

    return {
        props,
        enzymeWrapper
    }
}


describe('CommentForm Component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = commentFormComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render container form tag with class "commentForm"', () => {
        const { enzymeWrapper } = commentFormComponentSetup();
        
        expect(enzymeWrapper.find('form.commentForm')).toHaveLength(1);
    });

    it('should render textarea tag', () => {
        const { enzymeWrapper } = commentFormComponentSetup();
        
        expect(enzymeWrapper.find('textarea')).toHaveLength(1);
    });

    it('should render input with type "submit"', () => {
        const { enzymeWrapper } = commentFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="submit"]')).toHaveLength(1);
    });

    it('should render input with type "submit" which is disabled', () => {
        const { enzymeWrapper } = commentFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="submit"]').prop('disabled')).toEqual(true);
    });

    it('should render textarea with onChange event', () => {
        const { enzymeWrapper } = commentFormComponentSetup();
        
        expect(enzymeWrapper.find('textarea').prop('onChange')).toBeDefined();
    });

    it('should test if user text is echoed', () => {
        const { enzymeWrapper } = commentFormComponentSetup();

        const mockedEvent = {
            target: { value: 'hello', name: 'text' },
            persist: jest.fn()
        };

        enzymeWrapper.find('textarea').simulate('change', mockedEvent);

        expect(enzymeWrapper.find('textarea').props().value).toEqual('hello');
    });

    it('should test if makeCommentHandler is called when form is submitted and textarea value is not empty string', () => {
        const { enzymeWrapper, props } = commentFormComponentSetup();

        const mockedEvent = {
            preventDefault: () => {},
        };

        const mockedTextareaEvent = {
            target: { value: 'hello', name: 'text' },
            persist: jest.fn()
        };

        enzymeWrapper.find('textarea').simulate('change', mockedTextareaEvent);

        enzymeWrapper.find('form').simulate('submit', mockedEvent);

        expect(props.makeCommentHandler).toHaveBeenCalledTimes(1);
    });

    it('should test if createSnackbar is called when form is submitted and textarea value is empty string or undefined', () => {
        const { enzymeWrapper, props } = commentFormComponentSetup();

        const mockedEvent = {
            preventDefault: () => {},
        };
      
        enzymeWrapper.find('form').simulate('submit', mockedEvent);

        expect(props.createSnackbar).toHaveBeenCalledTimes(1);
    });
});
