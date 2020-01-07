export default interface DeleteModalProps {
    handleClose: () => void;
    deleteFunc: (feedId: string) => void;
    feedId: string;
    isPost: boolean;
}