import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import SearchCustomersQuery from "./searchCustomersQuery";
import SearchCustomersResponse from "./searchCustomersResponse";
import Query from "@context/shared/domain/queryBus/query";
import CustomersSearcher from "./customersSearcher";

export default class SearchCustomersQueryHandler implements QueryHandler<SearchCustomersQuery, SearchCustomersResponse> {
    private readonly searcher: CustomersSearcher;

    constructor(searcher: CustomersSearcher) {
        this.searcher = searcher;
    }

    subscribedTo(): Query {
        return SearchCustomersQuery;
    }
    
    handle(query: SearchCustomersQuery): Promise<SearchCustomersResponse> {
        return this.searcher.run(query);
    }
}