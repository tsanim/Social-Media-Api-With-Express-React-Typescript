import React from 'react';
import { shallow } from 'enzyme';

import MessageForm from '../Forms/MessageForm';

function messageFormComponentSetup() {
    const props = {
        messageText: 'text',
        onInputChangeHandler: jest.fn(),
        onKeyPressHandler: jest.fn(),
        onFocusHandler: jest.fn(),
        onBlurHandler: jest.fn(),
        sendMessageHandler: jest.fn(),
        onKeyDownHandler: jest.fn()
    }

    const enzymeWrapper = shallow(<MessageForm {...props} />)

    return {
        props,
        enzymeWrapper
    }
}


describe('MessageForm Component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = messageFormComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render container div tag with class "messageForm"', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('div.messageForm')).toHaveLength(1);
    });

    it('should render container form tag with id "messageForm"', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('form#messageForm')).toHaveLength(1);
    });

    it('should render input with type "text"', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="text"]')).toHaveLength(1);
    });

    it('should render input with type "button" ', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="button"]')).toHaveLength(1);
    });

    it('should render input type "text" with name "messageText"', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="text"]').prop('name')).toEqual('messageText');
    });

    it('should render input with type "text" with onChange event', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="text"]').prop('onChange')).toBeDefined();
    });

    it('should render input with type "text" with onKeyPress event', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="text"]').prop('onKeyPress')).toBeDefined();
    });

    it('should render input with type "text" with onKeyDown event', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="text"]').prop('onKeyDown')).toBeDefined();
    });

    it('should render input with type "text" with onBlur event', () => {
        const { enzymeWrapper } = messageFormComponentSetup();
        
        expect(enzymeWrapper.find('input[type="text"]').prop('onBlur')).toBeDefined();
    });

    it('should test if user text is echoed', () => {
        const { enzymeWrapper, props } = messageFormComponentSetup();

        expect(enzymeWrapper.find('input[type="text"]').props().value).toEqual(props.messageText);
    });
});