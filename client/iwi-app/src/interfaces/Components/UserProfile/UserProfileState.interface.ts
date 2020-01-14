import User, { PlainUser } from "../../User/User.interface";

export default interface UserProfileState {
    showModal: boolean;
    users: PlainUser[];
    modalHeaderName: string;
}