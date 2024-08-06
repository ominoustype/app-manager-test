import Query from "@context/shared/domain/queryBus/query";

export type SearchEnvironmentsQueryParams = {
    page_size?: number;
    page?: number;
    search?: string;
};

export default class SearchEnvironmentsQuery extends Query {
    readonly params: SearchEnvironmentsQueryParams;

    constructor(params: SearchEnvironmentsQueryParams) {
        super();
        this.params = params;
    }
}