import React from 'react';

import { shallow } from 'enzyme';
import UserChatCard from '../ChatComponents/UserChatCard';

function userChatCardComponentSetup() {
    const props = {
        onlineUser: {},
        isMine: true
    }

    const enzymeWrapper = shallow(<UserChatCard {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('UserChatCard component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = userChatCardComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render figure tag with class "float-right"', () => {
        const { enzymeWrapper } = userChatCardComponentSetup();

        expect(enzymeWrapper.find('figure').hasClass('float-right')).toEqual(true);
    });

    it('should render img tag', () => {
        const { enzymeWrapper } = userChatCardComponentSetup();

        expect(enzymeWrapper.find('img')).toHaveLength(1);
    });

    it('should render div tag with class "names"', () => {
        const { enzymeWrapper } = userChatCardComponentSetup();

        expect(enzymeWrapper.find('div.names')).toHaveLength(1);
    });

    it('should render figcaption tag', () => {
        const { enzymeWrapper } = userChatCardComponentSetup();

        expect(enzymeWrapper.find('figcaption')).toHaveLength(1);
    });
});