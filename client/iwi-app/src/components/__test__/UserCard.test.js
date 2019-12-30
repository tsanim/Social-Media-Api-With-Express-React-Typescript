import React from 'react';

import { shallow } from 'enzyme';
import UserCard from '../DiscoverComponents/UserCard';

function userCardComponentSetup() {
    const props = {
        user: {},
    }

    const enzymeWrapper = shallow(<UserCard {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('UsesCard component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = userCardComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div tag with class "card"', () => {
        const { enzymeWrapper } = userCardComponentSetup();

        expect(enzymeWrapper.find('div.card')).toHaveLength(1);
    });

    it('should render a figure tag', () => {
        const { enzymeWrapper } = userCardComponentSetup();

        expect(enzymeWrapper.find('figure')).toHaveLength(1);
    });

    it('should render img tag', () => {
        const { enzymeWrapper } = userCardComponentSetup();

        expect(enzymeWrapper.find('img')).toHaveLength(1);
    });

    it('should render div tag with class "names"', () => {
        const { enzymeWrapper } = userCardComponentSetup();

        expect(enzymeWrapper.find('div.names')).toHaveLength(1);
    });

    it('should render figcaption tag', () => {
        const { enzymeWrapper } = userCardComponentSetup();

        expect(enzymeWrapper.find('figcaption')).toHaveLength(1);
    });

    it('should render span tag with class "fullname"', () => {
        const { enzymeWrapper } = userCardComponentSetup();

        expect(enzymeWrapper.find('span.fullname')).toHaveLength(1);
    });
});