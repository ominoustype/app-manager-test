export default class EnviromentNotFoundError extends Error {
    constructor(id: string) {
        super(`Enviroment with id ${id} not found`);
    }
}