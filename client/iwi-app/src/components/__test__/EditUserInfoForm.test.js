import React from 'react';
import { shallow } from 'enzyme';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { EditUserInfoForm, FormikEditForm } from '../Forms/EditUserInfoForm';

function editUserInfoFormComponentSetup() {
    const props = {
        editUserInfoHandler: jest.fn(),
        createSnackbar: jest.fn(),
    }

    const enzymeWrapper = shallow(<EditUserInfoForm {...props} />)

    return {
        props,
        enzymeWrapper
    }
}

describe('EditUserInfoForm Component', () => {
    it('should render initial layout', () => {
        const { enzymeWrapper } = editUserInfoFormComponentSetup();

        expect(enzymeWrapper.getElements()).toMatchSnapshot();
    });

    it('should render Formik Component', () => {
        const { enzymeWrapper } = editUserInfoFormComponentSetup();

        expect(enzymeWrapper.find(Formik)).toHaveLength(1);
    });

    it('should test if call handleSubmit()', (done) => {
        const { enzymeWrapper, props } = editUserInfoFormComponentSetup();

        enzymeWrapper.find(Formik).simulate('submit');
        
        expect(props.editUserInfoHandler).toHaveBeenCalledTimes(1);
        expect(props.createSnackbar).toHaveBeenCalledTimes(1);

        done();
    });
});