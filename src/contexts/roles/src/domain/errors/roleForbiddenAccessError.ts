export default class RoleForbiddenAccessError extends Error{
    constructor(id: string) {
        super(`Access to role with id ${id} forbidden`);
    }
}