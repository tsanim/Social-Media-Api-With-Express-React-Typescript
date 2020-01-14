export default interface Encription {
    generateSalt: () => void;
    generateHashedPassword: (salt: string, password: string) => void;
}