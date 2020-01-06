import { ChangePassword } from "../EditUserInformation/EditUserInfoProps.interface";

export default interface ChangePasswordFormProps {
    changePasswordHandler: (data: ChangePassword) => void;
    createSnackbar: (data: any) => void;
    errors: any[];
    resetErrorsHandler: () => void;
}