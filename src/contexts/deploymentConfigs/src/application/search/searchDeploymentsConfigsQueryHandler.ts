import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import SearchDeploymentsConfigsQuery from "./searchDeploymentsConfigsQuery";
import SearchDeploymentsConfigsResponse from "./searchDeploymentsConfigsResponse";
import Query from "@context/shared/domain/queryBus/query";
import DeploymentsConfigsSearcher from "./deploymentsConfigsSearcher";

export default class SearchDeploymentsConfigsQueryHandler implements
    QueryHandler<SearchDeploymentsConfigsQuery, SearchDeploymentsConfigsResponse>{
    private readonly searcher: DeploymentsConfigsSearcher;

    constructor(searcher: DeploymentsConfigsSearcher) {
        this.searcher = searcher;
    }

    subscribedTo(): Query {
        return SearchDeploymentsConfigsQuery;
    }

    handle(query: SearchDeploymentsConfigsQuery): Promise<SearchDeploymentsConfigsResponse> {
        return this.searcher.run(query);
    }

}