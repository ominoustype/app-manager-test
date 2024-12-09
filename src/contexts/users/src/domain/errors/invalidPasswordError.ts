export default class InvalidPasswordError extends Error {
    constructor(username: string) {
        super(`Invalid password for user ${username}`);
    }
}
