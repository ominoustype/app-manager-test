import { Response } from '@context/shared/domain/queryBus/response';
import Document, { DocumentPrimitives } from '@src/domain/document';

export default class FindDocumentResponse implements Response {
    readonly primitives: DocumentPrimitives;

    constructor(document: Document) {
        this.primitives = document.toPrimitives();
    }
}
