import DeploymentConfigsRepository from "@src/domain/deploymentConfigsRepository";
import SearchDeploymentsConfigsQuery from "./searchDeploymentsConfigsQuery";
import SearchDeploymentsConfigsResponse from "./searchDeploymentsConfigsResponse";

export default class DeploymentsConfigsSearcher{
    private readonly repository: DeploymentConfigsRepository;

    constructor(repository: DeploymentConfigsRepository){
        this.repository = repository;
    }

    async run(query: SearchDeploymentsConfigsQuery): Promise<SearchDeploymentsConfigsResponse> {
        return new SearchDeploymentsConfigsResponse(await this.repository.search(query.params));
    }
}