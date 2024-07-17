import Document, { DocumentPrimitives } from '@src/domain/document';
import FindDocumentResponse from './findDocumentResponse';

export default class FindDocumentResponseMother {
    static create(document: DocumentPrimitives): FindDocumentResponse {
        return new FindDocumentResponse(new Document(document));
    }
}