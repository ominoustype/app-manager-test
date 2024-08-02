export default class EnviromentAlreadyExistsError extends Error{
    constructor(id: string) {
        super(`Enviroment with id ${id} already exists`);
    }
}