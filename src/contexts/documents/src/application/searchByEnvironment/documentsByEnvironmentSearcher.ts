import DocumentRepository from '@src/domain/documentRepository';
import SearchByEnvironmentDocumentsQuery from './searchByEnvironmentDocumentsQuery';
import SearchByEnvironmentDocumentsResponse from './searchByEnvironmentDocumentsResponse';

export default class DocumentsByEnvironmentSearcher {
    private readonly repository: DocumentRepository;

    constructor(repository: DocumentRepository) {
        this.repository = repository;
    }

    async run(query: SearchByEnvironmentDocumentsQuery): Promise<SearchByEnvironmentDocumentsResponse> {
        const documents = await this.repository.searchByEnvironment(query.params.environment);
        return new SearchByEnvironmentDocumentsResponse(documents);
    }
}
