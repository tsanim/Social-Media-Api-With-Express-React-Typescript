import React from 'react';
import Footer from '../App/common/Footer/Footer';
import { shallow } from 'enzyme';

describe('Footer component', () => {
    it('should render initial layout', () => {
        const enzymeWrapper = shallow(<Footer />);

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render child p tag', () => {
        const enzymeWrapper = shallow(<Footer />);

        expect(enzymeWrapper.find('p')).toHaveLength(1);
    });
});