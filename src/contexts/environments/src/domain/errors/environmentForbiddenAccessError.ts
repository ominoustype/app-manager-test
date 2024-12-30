export default class EnvironmentForbiddenAccessError extends Error{
    constructor(id: string) {
        super(`Access to environment with id ${id} forbidden`);
    }
}