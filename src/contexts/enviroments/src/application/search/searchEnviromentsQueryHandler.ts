import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import SearchEnviromentsQuery from "./searchEnviromentsQuery";
import EnviromentsSearcher from "./enviromentsSearcher";
import SearchEnviromentsResponse from './searchEnviromentsResponse';

export default class SearchEnviromentsQueryHandler implements QueryHandler<SearchEnviromentsQuery, SearchEnviromentsResponse> {
    private readonly searcher: EnviromentsSearcher;

    constructor(searcher: EnviromentsSearcher) {
        this.searcher = searcher;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return SearchEnviromentsQuery;
    }

    handle(query: SearchEnviromentsQuery): Promise<SearchEnviromentsResponse> {
        return this.searcher.run(query);
    }
}
