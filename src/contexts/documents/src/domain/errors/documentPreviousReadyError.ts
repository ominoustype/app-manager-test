export default class DocumentPreviousReadyError extends Error {
    constructor(id: string, environmentId: string) {
        super(`A previous version of the Document with id ${id} is READY to be deployed
                in one environment. Can not be moved to the environment ${environmentId} 
                under such circumstances`);
    }
}