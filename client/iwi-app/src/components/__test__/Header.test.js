import React from 'react';
import Header from '../App/common/Header/Header';
import Nav from '../App/common/Header/Nav';

import { shallow } from 'enzyme';

function headerComponentSetup() {
    const props = {
        user: {},
        resetUserPostsHandler: jest.fn(),
        signoutHandler: jest.fn(),
        switchToOffline: jest.fn(),
        switchToOnline: jest.fn()
    }

    window.localStorage.setItem('username', 'Tsani');

    const enzymeWrapper = shallow(<Header {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Header component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = headerComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div container with class "logo"', () => {
        const { enzymeWrapper } = headerComponentSetup();

        expect(enzymeWrapper.find('div').hasClass('logo')).toEqual(true);
    });

    it('should render Nav Component if localStorage has item username', () => {
        const { enzymeWrapper } = headerComponentSetup();

        expect(enzymeWrapper.find(Nav)).toHaveLength(1);
    });
});
