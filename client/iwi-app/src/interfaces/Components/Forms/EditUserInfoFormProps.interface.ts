import { EditUserInformation } from "../EditUserInformation/EditUserInfoProps.interface";

export default interface EditUserInfoFormProps {
    editUserInfoHandler: (data: EditUserInformation) => void;
    createSnackbar: (data: any) => void;
}