export default class DocumentNotPushedError extends Error {
    constructor(id: string) {
        super(`The document with id ${id} does not contain a previous version already pushed`);
    }
}