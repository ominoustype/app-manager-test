import DeploymentConfigs from "@src/domain/deploymentConfigs";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import DeploymentConfigsId from "@src/domain/deploymentConfigsId";
import DeploymentConfigsNotFoundError from "./errors/deploymentConfigsNotFoundError";

export default class DeploymentConfigsFinder{
    private readonly deploymentConfigsRepository: DeploymentConfigsRepository;

    constructor(deploymentConfigsRepository: DeploymentConfigsRepository){
        this.deploymentConfigsRepository= deploymentConfigsRepository;
    }

    async find(id: string): Promise<DeploymentConfigs>{
        const deploymentConfigs = await this.deploymentConfigsRepository.find(new DeploymentConfigsId(id));
        
        if(!deploymentConfigs)
            throw new DeploymentConfigsNotFoundError(id);

        return deploymentConfigs;
    }

}