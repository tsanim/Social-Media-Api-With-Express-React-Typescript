import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

import { shallow } from 'enzyme';
import { Link } from 'react-router-dom';

function dropdownComponentSetup() {
    const props = {
        notifications: [ { _id: '123', sender: '' } ],
    }


    const enzymeWrapper = shallow(<Dropdown {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('Dropdown component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = dropdownComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div container with class "dropdown"', () => {
        const { enzymeWrapper } = dropdownComponentSetup();

        expect(enzymeWrapper.find('div.dropdown')).toHaveLength(1);
    });

    it('should render button tag with class "dropbtn"', () => {
        const { enzymeWrapper } = dropdownComponentSetup();

        expect(enzymeWrapper.find('button.dropbtn')).toHaveLength(1);
    });

    it('should render div tag with class "dropdown-content"', () => {
        const { enzymeWrapper } = dropdownComponentSetup();

        expect(enzymeWrapper.find('div.dropdown-content')).toHaveLength(1);
    });

    it('should render div tag children with count equal to notifications array length', () => {
        const { enzymeWrapper, props } = dropdownComponentSetup();

        expect(enzymeWrapper.find('div.dropdown-content').children()).toHaveLength(props.notifications.length);
    });

    it('should render Link Components count equal to notifications array length', () => {
        const { enzymeWrapper, props } = dropdownComponentSetup();

        expect(enzymeWrapper.find(Link)).toHaveLength(props.notifications.length);
    });
});