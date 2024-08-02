import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import FindDeploymentConfigsQuery from '@src/application/find/findDeploymentConfigsQuery';
import FindDeploymentConfigsResponse from '@src/application/find/findDeploymentConfigsResponse';
import DocumentFinder from '@src/application/find/deploymentConfigsFinder';

export default class FindDeploymentConfigsQueryHandler implements QueryHandler<FindDeploymentConfigsQuery, FindDeploymentConfigsResponse>{
    private readonly finder: DocumentFinder;

    constructor(finder: DocumentFinder){
        this.finder = finder;
    }
    
    subscribedTo(): Query {
        return FindDeploymentConfigsQuery;
    }

    handle(query: FindDeploymentConfigsQuery): Promise<FindDeploymentConfigsResponse> {
        return this.finder.run(query);
    }

}