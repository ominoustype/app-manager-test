import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import DeploymentConfigsByEnvironmentIsDeployedSearcher from './deploymentConfigsByEnvironmentIsDeployedSearcher';
import SearchByEnvironmentIsDeployedDeploymentConfigsQuery from './searchByEnvironmentIsDeployedDeploymentConfigsQuery';
import SearchByEnvironmentIsDeployedDeploymentConfigsResponse from './searchByEnvironmentIsDeployedDeploymentConfigsResponse';

export default class SearchByEnvironmentIsDeployedDeploymentConfigsQueryHandler implements 
    QueryHandler<SearchByEnvironmentIsDeployedDeploymentConfigsQuery, SearchByEnvironmentIsDeployedDeploymentConfigsResponse> {
    private readonly searcher: DeploymentConfigsByEnvironmentIsDeployedSearcher;

    constructor(searcher: DeploymentConfigsByEnvironmentIsDeployedSearcher) {
        this.searcher = searcher;
    }
    
    subscribedTo(): Query {
        return SearchByEnvironmentIsDeployedDeploymentConfigsQuery;
    }

    handle(query: SearchByEnvironmentIsDeployedDeploymentConfigsQuery): Promise<SearchByEnvironmentIsDeployedDeploymentConfigsResponse> {
        return this.searcher.run(query);
    }
}
