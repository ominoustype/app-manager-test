import DocumentRepository from '@src/domain/documentRepository';
import SearchByEnvironmentDocumentsQuery from './searchByEnvironmentDocumentsQuery';
import SearchByEnvironmentDocumentsResponse from './searchByEnvironmentDocumentsResponse';
import Documents from '@src/domain/documents';

export default class DocumentsByEnvironmentSearcher {
    private readonly repository: DocumentRepository;

    constructor(repository: DocumentRepository) {
        this.repository = repository;
    }

    async run(query: SearchByEnvironmentDocumentsQuery): Promise<SearchByEnvironmentDocumentsResponse> {
        const { environment } = query.params,
            { environmentIds } = query.permissions;

        if(!environmentIds.includes(environment)) {
            return new SearchByEnvironmentDocumentsResponse(new Documents([]));
        }

        const documents = await this.repository.searchByEnvironment(query.params.environment);
        return new SearchByEnvironmentDocumentsResponse(documents);
    }
}
