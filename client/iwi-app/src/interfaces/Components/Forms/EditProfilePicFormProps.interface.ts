export default interface EditProfilePictureFormProps {
    imageId: string;
    changeProfilePicHandler: (data: FormData) => void;
    createSnackbar: (data: any) => void;
}