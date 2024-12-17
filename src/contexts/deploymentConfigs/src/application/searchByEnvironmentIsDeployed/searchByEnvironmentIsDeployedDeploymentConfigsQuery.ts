import Query from '@context/shared/domain/queryBus/query';

export type SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams = {
    environmentId: string;
    isDeployed: boolean;
};

export default class SearchByEnvironmentIsDeployedDeploymentConfigsQuery extends Query {
    readonly params: SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams;

    constructor(params: SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams) {
        super();
        this.params = params;
    }
}
