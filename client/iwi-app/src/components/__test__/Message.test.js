import React from 'react';
import Message from '../ChatComponents/Message';
import { shallow } from 'enzyme';
import UserChatCard from '../ChatComponents/UserChatCard';

function messageComponentSetup() {
    const props = {
        isMine: true,
        message: { creator: {}, text: '' },
    }

    const enzymeWrapper = shallow(<Message {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Message component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = messageComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div with class "chat-message"', () => {
        const { enzymeWrapper } = messageComponentSetup();

        expect(enzymeWrapper.find('div.chat-message')).toHaveLength(1);
    });

    it('should render a div tag', () => {
        const { enzymeWrapper } = messageComponentSetup();

        expect(enzymeWrapper.find('div')).toHaveLength(1);
    });

    it('should has child UserChatCard Component', () => {
        const { enzymeWrapper } = messageComponentSetup();

        expect(enzymeWrapper.find(UserChatCard)).toHaveLength(1);
    });
});