import { PlainUser } from "../../User/User.interface";

export default interface UserInfoContainerProps {
    user: PlainUser;
    isFollowed?: boolean;
    modalShowHandler: () => void;
    unfollowHandler?: (userId: string) => void;
    followHandler?: (userId: string) => void;
}