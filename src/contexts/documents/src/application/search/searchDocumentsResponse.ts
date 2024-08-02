import { Response } from '@context/shared/domain/queryBus/response';
import Documents, { DocumentsPrimitives } from '@src/domain/documents';

export default class SearchDocumentsResponse implements Response {
    readonly documents: DocumentsPrimitives;

    constructor(documents: Documents) {
        this.documents = documents.toPrimitives();
    }
}
