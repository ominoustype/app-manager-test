import Password from '@src/domain/password/password';
import InterfacePasswordValidator from '@src/domain/password/passwordValidator';
import crypto from 'crypto';

export default class PasswordValidator implements InterfacePasswordValidator {
    encode(password: string, algorithm: string, iterations: number, salt: string): string {
        const hash = crypto.pbkdf2Sync(
            password,
            salt,
            iterations,
            32,
            'sha256'
        );

        return `${algorithm}$${iterations}$${salt}$${hash.toString('base64')}`;
    }

    decode(encoded: string) {
        const [algorithm, iterations, salt, hash] = encoded.split('$');

        return {
            algorithm,
            hash,
            iterations: parseInt(iterations, 10),
            salt
        };
    }

    validate(password: Password, otherPassword: Password): boolean {
        const decoded = this.decode(otherPassword.value);
        const encodedPassword = this.encode(password.value, decoded.algorithm, decoded.iterations, decoded.salt);

        return (otherPassword.toString() === encodedPassword.toString()) as boolean;
    }
}