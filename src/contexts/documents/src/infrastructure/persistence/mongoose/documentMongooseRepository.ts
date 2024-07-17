import { Nullable } from '@context/shared/domain/nullable';
import MongooseRepository from '@context/shared/infrastructure/mongoose/mongooseRepository'
import Document from '@src/domain/document';
import DocumentId from '@src/domain/documentId';
import DocumentRepository from '@src/domain/documentRepository';

export default class DocumentMongooseRepository extends MongooseRepository implements DocumentRepository {
    protected modelName(): string {
        return 'Document';
    }

    async find(id: DocumentId): Promise<Nullable<Document>> {
        const a = await this.model()
        console.log(a, id)
        return null;
    }
}