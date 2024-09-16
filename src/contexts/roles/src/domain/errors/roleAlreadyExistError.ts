export default class RoleAlreadyExistsError extends Error {
    constructor(id: string) {
        super(`Role with id ${id} already exists`);
    }
}