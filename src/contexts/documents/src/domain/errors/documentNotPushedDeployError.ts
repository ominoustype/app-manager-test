export default class DocumentNotPushedDeployError extends Error {
    constructor(documentId: string, deploymentConfigsId: string) {
        super(`The given document with id -> ${documentId} was not found within the documents ready
            to be deployed of the deploymentConfigs with the id -> ${deploymentConfigsId}`);
    }
}