export default class InvalidTokenError extends Error {
    constructor(token: string) {
        super(`Invalid token ${token}`);
    }
}
