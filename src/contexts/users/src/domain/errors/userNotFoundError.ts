export default class UserNotFoundError extends Error {
    constructor(username: string) {
        super(`User with username ${username} not found`);
    }
}
