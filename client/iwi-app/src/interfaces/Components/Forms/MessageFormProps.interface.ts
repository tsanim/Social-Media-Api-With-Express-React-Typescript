export default interface MessageFormProps {
    messageText: string;
    onInputChangeHandler: () => void;
    onKeyPressHandler: () => void;
    onKeyDownHandler: () => void;
    onBlurHandler: () => void;
    sendMessageHandler: () => void;
}