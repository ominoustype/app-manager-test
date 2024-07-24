export default class DocumentAlreadyExistsError extends Error {
    constructor(id: string) {
        super(`Document with id ${id} already exists`);
    }
}
