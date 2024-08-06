import Query from "@context/shared/domain/queryBus/query";

export type SearchDeploymentsConfigsQueryParams = {
    page_size?: number;
    page?: number;
    search?: string;
};

export default class SearchDeploymentsConfigsQuery extends Query{
    readonly params: SearchDeploymentsConfigsQueryParams;

    constructor(params: SearchDeploymentsConfigsQueryParams) {
        super();
        this.params = params;
    }
}