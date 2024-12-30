export default class DeploymentConfigsForbiddenAccessError extends Error{
    constructor(environmentId: string) {
        super(`Access to deploymentsConfigs with environmentId ${environmentId} forbidden`);
    }
}