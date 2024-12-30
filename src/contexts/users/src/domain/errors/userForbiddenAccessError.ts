export default class UserForbiddenAccessError extends Error{
    constructor(username: string) {
        super(`Access to user with username ${username} forbidden`);
    }
}