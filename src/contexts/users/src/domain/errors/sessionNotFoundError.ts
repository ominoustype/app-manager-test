export default class SessionNotFoundError extends Error {
    constructor(username: string) {
        super(`Session request not found for user ${username}`);
    }
}
