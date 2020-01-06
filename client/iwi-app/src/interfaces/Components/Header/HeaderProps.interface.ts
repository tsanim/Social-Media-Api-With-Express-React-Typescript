import User from "../../User/User.interface";
import Notification from "../../Feed/Notification.interface";

export default interface HeaderProps {
    user: User;
    notifications: Notification[];
    signoutHandler: () => void;
    switchToOffline: () => void;
    switchToOnline: () => void;
    showDropDownHandler: () => void;
}