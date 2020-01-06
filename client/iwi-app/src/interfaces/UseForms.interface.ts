export default interface UseForms {
    inputs: { [name: string]: any };
    handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
    handleChangeInput(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>): void;
}
