import { Nullable } from '@context/shared/domain/nullable';
import DocumentId from '@src/domain/documentId';
import Document from '@src/domain/document';
import { SearchDocumentsQueryParams } from '@src/application/search/searchDocumentsQuery';
import Documents from './documents';

interface DocumentRepository {
    create(document: Document): Promise<void>;
    
    find(id: DocumentId): Promise<Nullable<Document>>;

    search(params: SearchDocumentsQueryParams): Promise<[Documents, number]>;

    searchByEnvironment(environment: string): Promise<Documents>;

    update(document: Document): Promise<void>;

    delete(document: Document): Promise<void>;
}

export default DocumentRepository;
