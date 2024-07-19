import { Nullable } from '@context/shared/domain/nullable';
import DocumentId from '@src/domain/documentId';
import Document from '@src/domain/document';

interface DocumentRepository {
    create(document: Document): Promise<void>;
    
    find(id: DocumentId): Promise<Nullable<Document>>;
}

export default DocumentRepository;
