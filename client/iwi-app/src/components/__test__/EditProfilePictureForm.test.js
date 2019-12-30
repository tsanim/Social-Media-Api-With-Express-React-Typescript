import React from 'react';
import { shallow } from 'enzyme';

import { EditProfilePictureForm } from '../Forms/EditProfilePicForm';

function editProfilePicFormComponentSetup() {
    const props = {
        imageId: '',
        changeProfilePicHandler: jest.fn(),
        createSnackbar: jest.fn(),
    }

    const state = {
        imagePreviewUrl: '',
    }

    const enzymeWrapper = shallow(<EditProfilePictureForm {...props} />)

    enzymeWrapper.setState(state);

    return {
        props,
        enzymeWrapper,
        state
    }
}

describe('EditProfilePictureForm Component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render form tag with class "editForm"', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.find('form.editForm')).toHaveLength(1);
    });

    it('should render form tag with encType prop equal to "multipart/form-data"', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.find('form.editForm').prop('encType')).toEqual('multipart/form-data');
    });

    it('should render form tag with onSubmit prop', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.find('form.editForm').prop('onSubmit')).toBeDefined();
    });

    it('should render figure tag', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.find('figure')).toHaveLength(1);
    });

    it('should render img tag with class "profileImg"', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.find('img.profileImg')).toHaveLength(1);
    });

    it('should render div tag with class "uploadImage"', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.find('div.uploadImage')).toHaveLength(1);
    });

    it('should render input tag with type "file"', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.find('input[type="file"]')).toHaveLength(1);
    });

    it('should render input tag with type "submit"', () => {
        const { enzymeWrapper } = editProfilePicFormComponentSetup();

        expect(enzymeWrapper.find('input[type="submit"]')).toHaveLength(1);
    });

    it('should test if file input onChange prop is called and echoed', (done) => {
        const { enzymeWrapper, state } = editProfilePicFormComponentSetup();

        const file = new Blob([
            JSON.stringify({})
        ], { type: 'image/jpeg' });

        const reader = new FileReader();

        enzymeWrapper.find('input[type="file"]').simulate('change', {
            preventDefault: () => { }, target: {
                files: [file],
                name: 'avatar'
            }
        });

        reader.onload = () => {
            enzymeWrapper.setState({ imagePreviewUrl: reader.result });
            expect(enzymeWrapper.find('img').prop('src')).toEqual(reader.result);
            done();
        }

        reader.readAsDataURL(file);
        done();
    });

    it('should test if submit form when form is submitted and call submit handler function', () => {
        const { enzymeWrapper, props } = editProfilePicFormComponentSetup();

        enzymeWrapper.find('form').simulate('submit', { preventDefault: () => { } });

        expect(props.changeProfilePicHandler).toHaveBeenCalledTimes(1);
        expect(props.createSnackbar).toHaveBeenCalledTimes(1);
    });
});