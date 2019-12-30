import React from 'react';
import CommentMeta from '../CommentComponents/commentMeta';

import { shallow } from 'enzyme';

function commentMetaComponentSetup() {
    const props = {
        date: '',
        likesCount: 1,
        handleShowLikesModal: jest.fn(),
    }

    const enzymeWrapper = shallow(<CommentMeta {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('CommentMeta component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = commentMetaComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div with class "meta"', () => {
        const { enzymeWrapper } = commentMetaComponentSetup();

        expect(enzymeWrapper.find('div.meta')).toHaveLength(1);
    });

    it('should render two span tags', () => {
        const { enzymeWrapper } = commentMetaComponentSetup();

        expect(enzymeWrapper.find('span')).toHaveLength(2);
    });

    it('should render span tag with class "date"', () => {
        const { enzymeWrapper } = commentMetaComponentSetup();

        expect(enzymeWrapper.find('span.date')).toHaveLength(1);
    });
});
