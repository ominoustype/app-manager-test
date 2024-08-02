import DomainDeploymentConfigsFinder from "@src/domain/deploymentConfigsFinder";
import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import FindDeploymentConfigsQuery from "@src/application/find/findDeploymentConfigsQuery";
import FindDeploymentConfigsResponse from "@src/application/find/findDeploymentConfigsResponse";

export default class DeploymentConfigsFinder{
    private readonly finder: DomainDeploymentConfigsFinder;

    constructor(repository: DeploymentConfigsRepository){
        this.finder = new DomainDeploymentConfigsFinder(repository);
    }

    async run(query: FindDeploymentConfigsQuery): Promise<FindDeploymentConfigsResponse>{
        return new FindDeploymentConfigsResponse(await this.finder.find(query.id));
    }
}