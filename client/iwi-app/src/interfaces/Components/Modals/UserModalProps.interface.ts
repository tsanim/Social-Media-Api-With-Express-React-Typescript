import { PlainUser } from "../../User/User.interface";

export default interface UserModalProps {
    handleClose: () => void;
    modalHeaderName: string;
    users: PlainUser[];
}