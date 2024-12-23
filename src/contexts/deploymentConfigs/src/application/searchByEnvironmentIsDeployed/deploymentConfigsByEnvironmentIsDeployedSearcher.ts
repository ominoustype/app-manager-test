import DeploymentConfigsRepository from '@src/domain/deploymentConfigsRepository';
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from './searchByEnvironmentIsDeployedDeploymentConfigsQuery';
import SearchByEnvironmentIsDeployedDeploymentConfigsResponse from './searchByEnvironmentIsDeployedDeploymentConfigsResponse';

export default class DeploymentConfigsByEnvironmentIsDeployedSearcher {
    private readonly repository: DeploymentConfigsRepository;

    constructor(repository: DeploymentConfigsRepository) {
        this.repository = repository;
    }

    async run(query: SearchByEnvironmentIsDeployedDeploymentConfigsQuery): Promise<SearchByEnvironmentIsDeployedDeploymentConfigsResponse> {
        const { params, permissions } = query;

        if(!permissions.environmentIds.includes(params.environmentId)) {
            throw new Error("401");
        }

        const deploymentsConfigs = await this.repository.searchByEnvironmentIsDeployed(query.params);

        return new SearchByEnvironmentIsDeployedDeploymentConfigsResponse(deploymentsConfigs);
    }
}