import React from 'react';
import UploadedImagePreview from '../PostComponents/UploadedImagePreview';

import { shallow } from 'enzyme';

function uploadedImagePreviewComponentSetup() {
    const props = {
        imagePreviewUrl: '123',
        handlePreviewImgClose: jest.fn()
    }

    const enzymeWrapper = shallow(<UploadedImagePreview {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('UploadedImagePreview component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = uploadedImagePreviewComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render div tag with class "uploadedImgPreview"', () => {
        const { enzymeWrapper } = uploadedImagePreviewComponentSetup();

        expect(enzymeWrapper.find('div.uploadedImgPreview')).toHaveLength(1);
    });

    it('should render img tag with id "previewImg" when imagePreviewUrl prop is not empty string', () => {
        const { enzymeWrapper } = uploadedImagePreviewComponentSetup();

        expect(enzymeWrapper.find('img#previewImg')).toHaveLength(1);
    });

    it('should render a div tag with class "overlay"  when imagePreviewUrl prop is not empty string', () => {
        const { enzymeWrapper } = uploadedImagePreviewComponentSetup();

        expect(enzymeWrapper.find('div.overlay')).toHaveLength(1);
    });
});
