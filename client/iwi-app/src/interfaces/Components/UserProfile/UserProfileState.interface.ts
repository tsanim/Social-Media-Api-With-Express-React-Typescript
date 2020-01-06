import User from "../../User/User.interface";

export default interface UserProfileState {
    showModal: boolean,
    users: User[],
    modalHeaderName: string
}