import DocumentId from '@src/domain/documentId';
import Document from '@src/domain/document';
import DocumentRepository from '@src/domain/documentRepository';
import DocumentNotFoundError from '@src/domain/errors/documentNotFoundError';

export default class DocumentFinder {
    private readonly documentRepository: DocumentRepository;

    constructor(documentRepository: DocumentRepository) {
        this.documentRepository = documentRepository;
    }

    async find(id: string): Promise<Document> {
        const document = await this.documentRepository.find(new DocumentId(id));

        if (!document) {
            throw new DocumentNotFoundError(id);
        }

        return document;
    }
}
