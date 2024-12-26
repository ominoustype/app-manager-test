import Query from '@context/shared/domain/queryBus/query'

export type FindDeploymentConfigsQueryParams = {
    id: string;
};

export type FindDeploymentConfigsQueryPermissions = {
    environmentIds: Array<string>
};

export default class FindDeploymentConfigsQuery extends Query {
    readonly id: string;
    readonly environmentIds: Array<string>;

    constructor(params: FindDeploymentConfigsQueryParams, permissions: FindDeploymentConfigsQueryPermissions){
        super();
        this.id = params.id;
        this.environmentIds = permissions.environmentIds;
    }
}