import React from 'react';
import { wrapComponent } from 'react-snackbar-alert';
import PropTypes from 'prop-types';
import isImage from '../../utils/isImage';
import UploadedImagePreview from '../PostComponents/UploadedImagePreview';
import PostFormState from '../../interfaces/Components/Forms/PostFormState.interface';
import PostFormProps from '../../interfaces/Components/Forms/PostFomProps.interface';

let fd = new FormData();

export class PostForm extends React.Component<PostFormProps, PostFormState> {
    state = {
        text: '',
        imagePreviewUrl: '',
    }

    handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        e.persist();

        const files = (e.target as HTMLInputElement).files;

        if (files && files.length > 0) {
            let reader = new FileReader();
            let file = (e.target as HTMLInputElement).files[0];

            if (!isImage(file.type)) {
                this.props.createSnackbar({
                    message: 'You should upload only images!',
                    timeout: 3000,
                });
                return;
            }

            fd.append(e.target.name, file, e.target.name);

            reader.onload = () => {
                this.setState((oldState) => ({
                    imagePreviewUrl: reader.result as string,
                }));
            }

            reader.readAsDataURL(file);
        }

        this.setState({
            text: e.target.value,
        });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //check for empty text and send message to user or emtpy file 
        if (this.state.text === '' && !fd.get('postImg')) {
            //using createSnackbar for displaying warning message to user 
            this.props.createSnackbar({
                message: 'You can not upload post without image or text!',
                timeout: 3000,
            });
        } else {
            fd.append('text', this.state.text);
            this.props.uploadHandler(fd)
        }

        //reset state
        fd = new FormData();
        this.setState({ text: '', imagePreviewUrl: '' });
    }

    handlePreviewImgClose = () => {
        fd.delete('postImg');
        this.setState({ imagePreviewUrl: '' })
    }

    render() {
        const { text, imagePreviewUrl } = this.state;

        return (
            <div className="postForm">
                <form id="postForm" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <textarea
                        name="text"
                        id="postText"
                        placeholder="Write something to your friends..."
                        value={text}
                        onChange={this.handleChangeInput}
                    />
                    <div className="inline-form-items">
                        <div className="uploadImage">
                            <label htmlFor="file"><img className="icon" src="https://cdn.iconscout.com/icon/free/png-256/gallery-44-267592.png" alt="uploadImg" />Image</label>
                            <input
                                type="file"
                                id="file"
                                name="postImg"
                                onChange={this.handleChangeInput}
                            />
                        </div>
                        <input disabled={!(fd.keys() || (text !== '' || imagePreviewUrl !== ''))} type="submit" value="Post" />
                    </div>
                </form>

                <UploadedImagePreview
                    imagePreviewUrl={imagePreviewUrl}
                    handlePreviewImgClose={this.handlePreviewImgClose}
                />
            </div>
        )
    }
}

// PostForm.propTypes = {
//     uploadHandler: PropTypes.func,
//     createSnackbar: PropTypes.func,
// }

export default wrapComponent(PostForm);