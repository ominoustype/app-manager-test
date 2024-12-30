import DomainDeploymentConfigsFinder from "@src/domain/deploymentConfigsFinder";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import FindDeploymentConfigsQuery from "@src/application/find/findDeploymentConfigsQuery";
import FindDeploymentConfigsResponse from "@src/application/find/findDeploymentConfigsResponse";
import logger from "@context/shared/infrastructure/logger";

export default class DeploymentConfigsFinder{
    private readonly finder: DomainDeploymentConfigsFinder;

    constructor(repository: DeploymentConfigsRepository){
        this.finder = new DomainDeploymentConfigsFinder(repository);
    }

    async run(query: FindDeploymentConfigsQuery): Promise<FindDeploymentConfigsResponse>{
        const { id, environmentIds } = query;

        logger.info("Finding deploymentConfigs with ", { id });
        
        return new FindDeploymentConfigsResponse(await this.finder.find(id, environmentIds));
    }
}