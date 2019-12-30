import React from 'react';
import Room from '../ChatComponents/Room';

import { shallow } from 'enzyme';
import Messages from '../ChatComponents/Messages';
import MessageForm from '../Forms/MessageForm';
import UserChatCard from '../ChatComponents/UserChatCard';

function roomComponentSetup() {
    const props = {
        onlineUser: {},
        messages: [],
        infoMessage: '',
        typing: '',
        onInputChangeHandler: jest.fn(),
        onKeyPressHandler: jest.fn(),
        onKeyDownHandler: jest.fn(),
        onBlurHandler: jest.fn(),
        message: '',
        sendMessageHandler: jest.fn(),
        onUnmountHandler: jest.fn()
    }

    const enzymeWrapper = shallow(<Room {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Room component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = roomComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render container div tag with class "chat"', () => {
        const { enzymeWrapper } = roomComponentSetup();

        expect(enzymeWrapper.find('div.chat')).toHaveLength(1);
    });

    it('should render header tag with class "chatHeader"', () => {
        const { enzymeWrapper } = roomComponentSetup();

        expect(enzymeWrapper.find('header.chatHeader')).toHaveLength(1);
    });

    it('should render Messages Component', () => {
        const { enzymeWrapper } = roomComponentSetup();

        expect(enzymeWrapper.find(Messages)).toHaveLength(1);
    });

    it('should render Message Component', () => {
        const { enzymeWrapper } = roomComponentSetup();

        expect(enzymeWrapper.find(MessageForm)).toHaveLength(1);
    });

    it('should render span tag with class "typing"', () => {
        const { enzymeWrapper } = roomComponentSetup();

        expect(enzymeWrapper.find('span.typing')).toHaveLength(1);
    });

    it('should render UserChatCard Component', () => {
        const { enzymeWrapper } = roomComponentSetup();

        expect(enzymeWrapper.find(UserChatCard)).toHaveLength(1);
    });
})