export default class DocumentVersionNotFoundError extends Error {
    constructor(id: string, version: string) {
        super(`Version ${version} of document with id ${id} not found`);
    }
}