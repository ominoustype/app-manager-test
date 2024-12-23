import Query from "@context/shared/domain/queryBus/query";

export type FindEnvironmentQueryParams = {
    id: string;
};

export type FindEnvironmentQueryPermissions = {
    environmentIds: Array<string>
};

export default class FindEnvironmentQuery extends Query{
    readonly id: string;
    readonly environmentIds: Array<string>;

    constructor(params: FindEnvironmentQueryParams, permissions: FindEnvironmentQueryPermissions) {
        super();
        this.id = params.id;
        this.environmentIds = permissions.environmentIds;
    }
}