import FindDocumentQuery from '@src/application/find/findDocumentQuery';
import FindDocumentResponse from '@src/application/find/findDocumentResponse';
import DomainDocumentFinder from '@src/domain/documentFinder';
import DocumentRepository from '@src/domain/documentRepository';

export default class DocumentFinder {
    private readonly finder: DomainDocumentFinder;

    constructor(repository: DocumentRepository) {
        this.finder = new DomainDocumentFinder(repository);
    }

    async run(query: FindDocumentQuery): Promise<FindDocumentResponse> {
        return new FindDocumentResponse(await this.finder.find(query.id));
    }
}
