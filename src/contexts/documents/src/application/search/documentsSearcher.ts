import DocumentRepository from '@src/domain/documentRepository';
import SearchDocumentsQuery from './searchDocumentsQuery';
import SearchDocumentsResponse from './searchDocumentsResponse';

export default class DocumentsSearcher {
    private readonly repository: DocumentRepository;

    constructor(repository: DocumentRepository) {
        this.repository = repository;
    }

    async run(query: SearchDocumentsQuery): Promise<SearchDocumentsResponse> {
        const [documents, count] = await this.repository.search(query.params, query.environmentIds);
        return new SearchDocumentsResponse(documents, count);
    }
}
