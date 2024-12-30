import DeploymentConfigsRepository from '@src/domain/deploymentConfigsRepository';
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from './searchByEnvironmentIsDeployedDeploymentConfigsQuery';
import SearchByEnvironmentIsDeployedDeploymentConfigsResponse from './searchByEnvironmentIsDeployedDeploymentConfigsResponse';
import DeploymentConfigsForbiddenAccessError from '@src/domain/errors/deploymentConfigsForbiddenAccessError';
import logger from '@context/shared/infrastructure/logger';

export default class DeploymentConfigsByEnvironmentIsDeployedSearcher {
    private readonly repository: DeploymentConfigsRepository;

    constructor(repository: DeploymentConfigsRepository) {
        this.repository = repository;
    }

    async run(query: SearchByEnvironmentIsDeployedDeploymentConfigsQuery): Promise<SearchByEnvironmentIsDeployedDeploymentConfigsResponse> {
        const { params, permissions } = query;

        logger.info("Finding deploymentConfigs with environmentId "+params.environmentId);

        if(!permissions.environmentIds.includes(params.environmentId)) {
            new DeploymentConfigsForbiddenAccessError(params.environmentId);
        }

        const deploymentsConfigs = await this.repository.searchByEnvironmentIsDeployed(query.params);

        return new SearchByEnvironmentIsDeployedDeploymentConfigsResponse(deploymentsConfigs);
    }
}