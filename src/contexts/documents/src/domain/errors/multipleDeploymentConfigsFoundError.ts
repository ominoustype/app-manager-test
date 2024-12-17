export default class MultipleDeploymentConfigsFoundError extends Error {
    constructor(environmentId: string) {
        super(`More than one DeploymentConfigs have been found linked to the environment with id ${environmentId}`);
    }
}