export default class DeploymentConfigsAlreadyExistsError extends Error {
    constructor(id: string) {
        super(`DeploymentConfigs with id ${id} already exists`);
    }
}
