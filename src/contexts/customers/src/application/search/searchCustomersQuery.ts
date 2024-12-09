import Query from "@context/shared/domain/queryBus/query";

export type SearchCustomersQueryParams = {
    search?: string;
};

export default class SearchCustomersQuery extends Query {
    readonly params: SearchCustomersQueryParams;

    constructor(params: SearchCustomersQueryParams) {
        super();
        this.params = params;
    }
}