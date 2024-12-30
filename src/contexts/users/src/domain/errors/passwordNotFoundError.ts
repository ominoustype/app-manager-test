export default class PasswordNotFoundError extends Error {
    constructor(username: string) {
        super(`Password for user ${username} not found`);
    }
}
