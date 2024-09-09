import { Response } from '@context/shared/domain/queryBus/response';
import Documents, { DocumentsPrimitives } from '@src/domain/documents';

export default class SearchDocumentsResponse implements Response {
    readonly documents: DocumentsPrimitives;
    readonly documentsCounter: number;

    constructor(documents: Documents, count: number) {
        this.documents = documents.toPrimitives();
        this.documentsCounter = count;
    }
}
