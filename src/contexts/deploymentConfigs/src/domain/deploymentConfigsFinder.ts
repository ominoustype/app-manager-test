import DeploymentConfigs from "@src/domain/deploymentConfigs";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import DeploymentConfigsId from "@src/domain/deploymentConfigsId";
import DeploymentConfigsNotFoundError from "./errors/deploymentConfigsNotFoundError";
export default class DeploymentConfigsFinder{
    private readonly deploymentConfigsRepository: DeploymentConfigsRepository;

    constructor(deploymentConfigsRepository: DeploymentConfigsRepository){
        this.deploymentConfigsRepository= deploymentConfigsRepository;
    }

    async find(id: string, environmentIds: Array<string>): Promise<DeploymentConfigs>{
        const deploymentConfigs = await this.deploymentConfigsRepository.
            findByIdAndEnvironmentIds(new DeploymentConfigsId(id), environmentIds);
        
        if(!deploymentConfigs) {
            throw new DeploymentConfigsNotFoundError(id);
        }

        return deploymentConfigs;
    }
}