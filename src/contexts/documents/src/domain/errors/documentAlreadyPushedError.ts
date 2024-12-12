export default class DocumentAlreadyPushedError extends Error {
    constructor(id: string) {
        super(`A previous version of the Document with id ${id} is READY to be deployed. 
            Can not be pushed again`);
    }
}