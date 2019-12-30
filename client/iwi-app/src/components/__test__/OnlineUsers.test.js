import React from 'react';
import OnlineUsers from '../ChatComponents/OnlineUsers';

import { shallow } from 'enzyme';

function onlineUsersComponentSetup() {
    const props = {
        showRoomHandler: jest.fn(),
        onlineUsers: [ { _id: '123' } ],
    }

    const enzymeWrapper = shallow(<OnlineUsers {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Online Users component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = onlineUsersComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div tag container with class "onlineUsers"', () => {
        const { enzymeWrapper } = onlineUsersComponentSetup();

        expect(enzymeWrapper.find('div.onlineUsers')).toHaveLength(1);
    });

    it('should render ul tag', () => {
        const { enzymeWrapper } = onlineUsersComponentSetup();

        expect(enzymeWrapper.find('ul')).toHaveLength(1);
    });

    it('should render h3 tag with text "Online users"', () => {
        const { enzymeWrapper } = onlineUsersComponentSetup();

        expect(enzymeWrapper.find('h3').text()).toEqual('Online users');
    });

    it('should render ul tag with items count equal to onlineUsers array lenght', () => {
        const { enzymeWrapper, props } = onlineUsersComponentSetup();

        expect(enzymeWrapper.find('ul').children()).toHaveLength(props.onlineUsers.length);
    });

    it('should has child ul tag with no items when onlineUsers array is empty', () => {
        const { enzymeWrapper } = onlineUsersComponentSetup();

        enzymeWrapper.setProps({ onlineUsers: [] });

        expect(enzymeWrapper.find('ul').children().getElements()).toHaveLength(0);
    });
});