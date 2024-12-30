export default class PasswordNotFound extends Error {
    constructor(username: string) {
        super(`Password for user ${username} not found`);
    }
}
