import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import SearchEnvironmentsQuery from "./searchEnvironmentsQuery";
import EnvironmentsSearcher from "./environmentsSearcher";
import SearchEnvironmentsResponse from './searchEnvironmentsResponse';

export default class SearchEnvironmentsQueryHandler implements QueryHandler<SearchEnvironmentsQuery, SearchEnvironmentsResponse> {
    private readonly searcher: EnvironmentsSearcher;

    constructor(searcher: EnvironmentsSearcher) {
        this.searcher = searcher;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return SearchEnvironmentsQuery;
    }

    handle(query: SearchEnvironmentsQuery): Promise<SearchEnvironmentsResponse> {
        return this.searcher.run(query);
    }
}
