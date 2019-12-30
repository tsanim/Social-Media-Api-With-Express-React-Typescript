import React from 'react';
import Messages from '../ChatComponents/Messages';
import { shallow } from 'enzyme';
import ScrollToBottom from 'react-scroll-to-bottom';

function messagesComponentSetup() {
    const props = {
        infoMessage: '',
        messages: [ { creator: {} } ],
    }

    const enzymeWrapper = shallow(<Messages {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Messages component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = messagesComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render ScrollToBottom Component with class "messagesContainer"', () => {
        const { enzymeWrapper } = messagesComponentSetup();

        expect(enzymeWrapper.find(ScrollToBottom).hasClass('messagesContainer')).toEqual(true);
    });

    it('should render p tag with class "msg"', () => {
        const { enzymeWrapper } = messagesComponentSetup();

        expect(enzymeWrapper.find('p').hasClass('msg')).toEqual(true);
    });

    it('should render ul tag with items count equal to messages length', () => {
        const { enzymeWrapper, props } = messagesComponentSetup();

        expect(enzymeWrapper.find('ul').children()).toHaveLength(props.messages.length);
    });

    it('should render ul tag with first item with class "clearfix"', () => {
        const { enzymeWrapper } = messagesComponentSetup();

        expect(enzymeWrapper.find('ul').childAt(0).hasClass('clearfix')).toEqual(true);
    });
});