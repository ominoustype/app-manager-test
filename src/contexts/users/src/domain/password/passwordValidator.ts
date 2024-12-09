import Password from './password';

export default interface PasswordValidator {
    validate(password: Password, otherPassword: Password): boolean;
}
