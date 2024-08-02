import Query from "@context/shared/domain/queryBus/query";

export type SearchEnviromentsQueryParams = {
    page_size?: number;
    page?: number;
    search?: string;
};

export default class SearchEnviromentsQuery extends Query {
    readonly params: SearchEnviromentsQueryParams;

    constructor(params: SearchEnviromentsQueryParams) {
        super();
        this.params = params;
    }
}