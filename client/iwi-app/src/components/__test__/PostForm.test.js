import React from 'react';
import { shallow, mount } from 'enzyme';

import { PostForm } from '../Forms/PostForm';
import UploadedImagePreview from '../PostComponents/UploadedImagePreview';
import { MemoryRouter } from 'react-router-dom';

function postFormComponentSetup() {
    const props = {
        uploadHandler: jest.fn(),
        createSnackbar: jest.fn(),
    }

    const state = {
        text: '',
        imagePreviewUrl: '',
    }

    const enzymeWrapper = shallow(<PostForm {...props} />)

    enzymeWrapper.setState(state);

    return {
        props,
        enzymeWrapper,
        state
    }
}


describe('PostForm Component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render container div tag with class "postForm"', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('div.postForm')).toHaveLength(1);
    });

    it('should render container form tag with id "postForm"', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('form#postForm')).toHaveLength(1);
    });

    it('should render textarea tag', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('textarea')).toHaveLength(1);
    });

    it('should render div tag with class "inline-form-items"', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('div.inline-form-items')).toHaveLength(1);
    });

    it('should render div tag with class "uploadImage"', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('div.uploadImage')).toHaveLength(1);
    });

    it('should render input with type "file"', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('input[type="file"]')).toHaveLength(1);
    });

    it('should render img tag with class "icon"', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('img.icon')).toHaveLength(1);
    });

    it('should render input with type "file" with onChange prop', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('input[type="file"]').prop('onChange')).toBeDefined();
    });

    it('should render input with type "submit"', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('input[type="submit"]')).toHaveLength(1);
    });

    it('should render input with type "submit" to be disabled', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('input[type="submit"]').prop('disabled')).toEqual(true);
    });

    it('should render form tag with encType prop', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        expect(enzymeWrapper.find('form').prop('encType')).toEqual('multipart/form-data');
    });

    it('should render UploadedImagePreview Compoenent if imagePreviewUrl is not empty string', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        enzymeWrapper.setState({ imagePreviewUrl: '123' });

        expect(enzymeWrapper.find(UploadedImagePreview)).toHaveLength(1);
    });

    it('should test if uploadHandler() is called when form is submitted and has post text or post image', () => {
        const { enzymeWrapper, props } = postFormComponentSetup();

        const mockedEvent = {
            target: { value: 'hello', name: 'text' },
            persist: jest.fn()
        };

        enzymeWrapper.find('textarea').simulate('change', mockedEvent);
        enzymeWrapper.find('form').simulate('submit', { preventDefault: () => { } });

        expect(props.uploadHandler).toHaveBeenCalledTimes(1);
    });

    it('should test if createSnackbar() is called when form is submitted and has not post text or post image', () => {
        const { enzymeWrapper, props } = postFormComponentSetup();

        enzymeWrapper.find('form').simulate('submit', { preventDefault: () => { } });

        expect(props.createSnackbar).toHaveBeenCalledTimes(1);
    });

    it('should test if user text is echoed', () => {
        const { enzymeWrapper } = postFormComponentSetup();

        const mockedEvent = {
            target: { value: 'hello', name: 'text' },
            persist: jest.fn()
        };

        enzymeWrapper.find('textarea').simulate('change', mockedEvent);

        expect(enzymeWrapper.find('textarea').props().value).toEqual('hello');
    });

    it('should test if input type file onChange handler call createSnackbar when file type is not image', () => {
        const { enzymeWrapper, props } = postFormComponentSetup();

        const file = new Blob([
            JSON.stringify({})
        ], { type: 'text/plain' });

        enzymeWrapper.find('input[type="file"]').simulate('change', {
            preventDefault: () => { },
            persist: () => { },
            target: {
                files: [file],
                name: 'postImg'
            }
        });

        expect(props.createSnackbar).toHaveBeenCalledTimes(1);
    });

    it('should test if file input onChange prop is called and echoed', (done) => {
        const { props } = postFormComponentSetup();
        const wrapper = mount(<MemoryRouter>
            <PostForm {...props} />
        </MemoryRouter>)
        const file = new Blob([
            JSON.stringify({})
        ], { type: 'image/jpeg' });

        const reader = new FileReader();

        wrapper.find('input[type="file"]').simulate('change', {
            preventDefault: jest.fn(),
            persist: jest.fn(),
            target: {
                files: [file],
                name: 'postImg'
            }
        });

        reader.onload = () => {
            wrapper.setState({ imagePreviewUrl: reader.result });
            expect(wrapper.find('img#previewImg').prop('src')).toEqual(reader.result);
            done();
        }

        reader.readAsDataURL(file);
        done();
    });
});