export default class DeploymentConfigsNotFoundError extends Error{
    constructor(id: string){
        super(`DeploymentConfigs with id ${id} not found`);
    }
}