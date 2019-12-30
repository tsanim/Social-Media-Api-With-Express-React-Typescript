import React from 'react';
import Nav from '../App/common/Header/Nav';
import { Detector } from "react-detect-offline";
import Dropdown from '../Dropdown/Dropdown';

import { shallow } from 'enzyme';

function navComponentSetup() {
    const props = {
        user: {},
        resetUserPostsHandler: jest.fn(),
        signoutHandler: jest.fn(),
        switchToOffline: jest.fn(),
        switchToOnline: jest.fn()
    }

    window.localStorage.setItem('username', 'Tsani');

    const enzymeWrapper = shallow(<Nav {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Header component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = navComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render nav tag container with id "main-nav"', () => {
        const { enzymeWrapper } = navComponentSetup();

        expect(enzymeWrapper.find('nav#main-nav')).toHaveLength(1);
    });

    it('should render ul tag', () => {
        const { enzymeWrapper } = navComponentSetup();

        expect(enzymeWrapper.find('ul')).toHaveLength(1);
    });

    it('should render Detector Component', () => {
        const { enzymeWrapper } = navComponentSetup();

        expect(enzymeWrapper.find(Detector)).toHaveLength(1);
    });

    it('should render ul tag with 8 items', () => {
        const { enzymeWrapper } = navComponentSetup();

        expect(enzymeWrapper.find('ul').children()).toHaveLength(8);
    });

    it('should render Dropdown Component', () => {
        const { enzymeWrapper } = navComponentSetup();

        expect(enzymeWrapper.find(Dropdown)).toHaveLength(1);
    });

    it('should render Detector Component with li tag with class "status online" if status online is true', () => {
        const { enzymeWrapper } = navComponentSetup();
        const hasClass = enzymeWrapper.find(Detector).renderProp('render')({ online: true }).find('li').hasClass('status online');

        expect(hasClass).toEqual(true);
    });

    it('should render Detector Component with li tag with class "status offline" if status online is false', () => {
        const { enzymeWrapper } = navComponentSetup();
        const hasClass = enzymeWrapper.find(Detector).renderProp('render')({ online: false }).find('li').hasClass('status offline');

        expect(hasClass).toEqual(true);
    });
});