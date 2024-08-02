import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import FindDocumentQuery from '@src/application/find/findDocumentQuery';
import FindDocumentResponse from '@src/application/find/findDocumentResponse';
import DocumentFinder from '@src/application/find/documentFinder';

export default class FindDocumentQueryHandler implements QueryHandler<FindDocumentQuery, FindDocumentResponse> {
    private readonly finder: DocumentFinder;

    constructor(finder: DocumentFinder) {
        this.finder = finder;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return FindDocumentQuery;
    }

    handle(query: FindDocumentQuery): Promise<FindDocumentResponse> {
        return this.finder.run(query);
    }
}
