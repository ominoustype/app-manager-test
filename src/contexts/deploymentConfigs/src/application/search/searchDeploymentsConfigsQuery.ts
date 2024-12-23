import Query from "@context/shared/domain/queryBus/query";

export type SearchDeploymentsConfigsQueryParams = {
    page_size?: number;
    page?: number;
    search?: string;
};

export type SearchDeploymentConfigsQueryPermissions = {
    environmentIds: Array<string>
};

export default class SearchDeploymentsConfigsQuery extends Query{
    readonly params: SearchDeploymentsConfigsQueryParams;
    readonly permissions: SearchDeploymentConfigsQueryPermissions;

    constructor(params: SearchDeploymentsConfigsQueryParams, permissions: SearchDeploymentConfigsQueryPermissions) {
        super();
        this.params = params;
        this.permissions = permissions;
    }
}