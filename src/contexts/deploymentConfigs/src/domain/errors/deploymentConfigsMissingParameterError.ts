export default class DeploymentConfigsMissingParameterError extends Error {
    constructor() {
        super(`Mandatory parameter is missing`);
    }
}