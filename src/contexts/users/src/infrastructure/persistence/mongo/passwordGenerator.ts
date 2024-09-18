import Password from '@src/domain/password/password';
import InterfacePasswordGenerator from '@src/domain/password/passwordGenerator';
import crypto from 'crypto';

export default class PasswordGenerator implements InterfacePasswordGenerator {
    private static MIN_LENGTH_PASSWORD = 100000;
    private static MAX_LENGTH_PASSWORD = 999999;

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


    generate(password: string): Password {
        const salt = crypto.randomBytes(16).toString('base64'),
            iterations = 24000,
            algorithm = 'pbkdf2_sha256',
            encoded = this.encode(password, algorithm, iterations, salt );

        return new Password(encoded);
    }

    generateClearPassword(): string {
        const diff =
			PasswordGenerator.MAX_LENGTH_PASSWORD -
			PasswordGenerator.MIN_LENGTH_PASSWORD;

        const random = Math.random();

        return `${Math.floor(random * diff) + PasswordGenerator.MIN_LENGTH_PASSWORD}`;
    }

}