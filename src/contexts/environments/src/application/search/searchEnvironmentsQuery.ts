import Query from "@context/shared/domain/queryBus/query";

export type SearchEnvironmentsQueryParams = {
    page_size?: number;
    page?: number;
    search?: string;
    customer?: string;
};

export type SearchEnvironmentQueryPermissions = {
    environmentIds: Array<string>
};

export default class SearchEnvironmentsQuery extends Query {
    readonly params: SearchEnvironmentsQueryParams;
    readonly permissions: SearchEnvironmentQueryPermissions;

    constructor(params: SearchEnvironmentsQueryParams, permissions: SearchEnvironmentQueryPermissions) {
        super();
        this.params = params;
        this.permissions = permissions;
    }
}