export default class EnvironmentAlreadyExistsError extends Error{
    constructor(id: string) {
        super(`Environment with id ${id} already exists`);
    }
}