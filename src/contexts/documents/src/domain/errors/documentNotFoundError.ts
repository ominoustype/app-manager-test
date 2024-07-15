export default class DocumentNotFoundError extends Error {
    constructor(id: string) {
        super(`Document with id ${id} not found`);
    }
}
