import React, { Component } from 'react';
import URI from '../../config/config';
import { wrapComponent } from 'react-snackbar-alert';
import PropTypes from 'prop-types';
import EditProfilePictureFormProps from '../../interfaces/Components/Forms/EditProfilePicFormProps.interface';

const fd = new FormData();

export class EditProfilePictureForm extends Component<EditProfilePictureFormProps, { imagePreviewUrl: string }> {
    state = {
        imagePreviewUrl: '',
    }

    handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files;

        if (files && files.length > 0) {
            let reader = new FileReader();
            let file = (e.target as HTMLInputElement).files[0];

            fd.append(e.target.name, file, e.target.name);

            reader.onload = () => {
                this.setState({
                    imagePreviewUrl: reader.result as string
                });
            }

            reader.readAsDataURL(file);
        }
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        this.props.changeProfilePicHandler(fd);

        this.props.createSnackbar({
            message: 'Profile picture is changed!',
            timeout: 3000,
        });
    }

    render() {
        return (
            <form className="editForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                <figure>
                    <img className="profileImg" src={this.state.imagePreviewUrl || `${URI}/feed/image/${this.props.imageId}`} alt="userPic" />
                    <div className="uploadImage">
                        <label htmlFor="file"><img className="icon" src="https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png" alt="uploadImg" />Change
                      Profile Picture</label>
                        <input type="file" id="file" name="avatar" onChange={this.handleChangeInput} />
                    </div>
                </figure>
                <input type="submit" value="SAVE" />
            </form>
        )
    }
}

// EditProfilePictureForm.propTypes = {
//     imageId: PropTypes.string,
//     changeProfilePicHandler: PropTypes.func,
//     createSnackbar: PropTypes.func,
// }

export default wrapComponent(EditProfilePictureForm);