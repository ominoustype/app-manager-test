import Query from '@context/shared/domain/queryBus/query';

export type SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams = {
    environmentId: string;
    isDeployed: boolean;
};

export type SearchByEnvironmentIsDeployedDeploymentConfigsQueryPermissions = {
    environmentIds: Array<string>
};

export default class SearchByEnvironmentIsDeployedDeploymentConfigsQuery extends Query {
    readonly params: SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams;
    readonly permissions: SearchByEnvironmentIsDeployedDeploymentConfigsQueryPermissions;

    constructor(params: SearchByEnvironmentIsDeployedDeploymentConfigsQueryParams, 
        permissions: SearchByEnvironmentIsDeployedDeploymentConfigsQueryPermissions) {
        super();
        this.params = params;
        this.permissions = permissions;
    }
}
