import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import SearchDocumentsQuery from './searchDocumentsQuery';
import DocumentsSearcher from './documentsSearcher';
import SearchDocumentsResponse from './searchDocumentsResponse';

export default class SearchDocumentsQueryHandler implements QueryHandler<SearchDocumentsQuery, SearchDocumentsResponse> {
    private readonly searcher: DocumentsSearcher;

    constructor(searcher: DocumentsSearcher) {
        this.searcher = searcher;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return SearchDocumentsQuery;
    }

    handle(query: SearchDocumentsQuery): Promise<SearchDocumentsResponse> {
        return this.searcher.run(query);
    }
}
