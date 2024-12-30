export default class DeploymentsConfigsNotFoundError extends Error{
    constructor(environmentId: string){
        super(`DeploymentsConfigs linked to the environment with id ${environmentId} not found`);
    }
}