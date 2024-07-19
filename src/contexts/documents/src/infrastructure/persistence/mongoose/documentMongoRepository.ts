import Cursor from '@context/shared/domain/criteria/cursor';
import { Nullable } from '@context/shared/domain/nullable';
import MongoRepository from '@context/shared/infrastructure/mongo/mongoRepository';
import Document from '@src/domain/document';
import DocumentId from '@src/domain/documentId';
import DocumentRepository from '@src/domain/documentRepository';

export default class DocumentMongoRepository extends MongoRepository<Document> implements DocumentRepository {
    protected moduleName(): string {
        return 'documents';
    }

    protected getCursor(item: Document, isBackward: boolean): Cursor {
        return Cursor.fromObject({
            _id: item.id.toString(), 
            isBackward 
        });
    }

    async create(document: Document): Promise<void> {
        await this.persist(document.id.value, document)
    }

    async find(id: DocumentId): Promise<Nullable<Document>> {
        return this.byId(id.value, Document.fromPrimitives);
    }
}