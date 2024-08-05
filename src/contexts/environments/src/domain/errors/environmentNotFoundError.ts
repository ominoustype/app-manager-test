export default class EnvironmentNotFoundError extends Error {
    constructor(id: string) {
        super(`Environment with id ${id} not found`);
    }
}