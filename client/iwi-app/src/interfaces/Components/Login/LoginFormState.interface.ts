export interface Login {
    email: string;
    password: string;
}

export default interface LoginFormState {
    form: Login;
}