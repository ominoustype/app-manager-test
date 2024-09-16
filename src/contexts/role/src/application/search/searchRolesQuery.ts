import Query from "@context/shared/domain/queryBus/query";

export type SearchRolesQueryParams = {
    name?: string;
    customerId?: string
}

export default class SearchRolesQuery extends Query {
    readonly params: SearchRolesQueryParams;

    constructor(params: SearchRolesQueryParams) {
        super();
        this.params = params;
    }
}