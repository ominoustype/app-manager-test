import Password from './password';

export default interface PasswordGenerator {
    generateClearPassword(): string;
    generate(password: string): Password;
}
