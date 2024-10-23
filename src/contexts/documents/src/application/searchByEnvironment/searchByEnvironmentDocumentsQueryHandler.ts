import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import SearchByEnvironmentDocumentsQuery from './searchByEnvironmentDocumentsQuery';
import DocumentsByEnvironmentSearcher from './documentsByEnvironmentSearcher';
import SearchByEnvironmentDocumentsResponse from './searchByEnvironmentDocumentsResponse';

export default class SearchByEnvironmentDocumentsQueryHandler implements QueryHandler<SearchByEnvironmentDocumentsQuery, SearchByEnvironmentDocumentsResponse> {
    private readonly searcher: DocumentsByEnvironmentSearcher;

    constructor(searcher: DocumentsByEnvironmentSearcher) {
        this.searcher = searcher;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return SearchByEnvironmentDocumentsQuery;
    }

    handle(query: SearchByEnvironmentDocumentsQuery): Promise<SearchByEnvironmentDocumentsResponse> {
        return this.searcher.run(query);
    }
}
