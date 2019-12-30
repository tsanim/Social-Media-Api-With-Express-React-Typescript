import React from 'react';
import CreatePostForm from '../PostComponents/CreatePostForm';

import { shallow } from 'enzyme';
import UserDataLink from '../UserInfoComponents/UserDataLink';
import PostForm from '../Forms/PostForm';

function createPostFormComponentSetup() {
    const props = {
        user: {},
        uploadHandler: jest.fn(),

    }

    const enzymeWrapper = shallow(<CreatePostForm {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('CreatePostForm component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = createPostFormComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div container with id "makeAPost"', () => {
        const { enzymeWrapper } = createPostFormComponentSetup();

        expect(enzymeWrapper.find('div#makeAPost')).toHaveLength(1);
    });

    it('should render figure tag with class "userInfo"', () => {
        const { enzymeWrapper } = createPostFormComponentSetup();

        expect(enzymeWrapper.find('figure.userInfo')).toHaveLength(1);
    });

    it('should render UserDataLink Component', () => {
        const { enzymeWrapper } = createPostFormComponentSetup();

        expect(enzymeWrapper.find(UserDataLink)).toHaveLength(1);
    });

    it('should render PostForm Component', () => {
        const { enzymeWrapper } = createPostFormComponentSetup();

        expect(enzymeWrapper.find(PostForm)).toHaveLength(1);
    });
});
