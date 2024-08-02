import DocumentsMother from '@src/domain/documents.mother';
import SearchDocumentsResponse from './searchDocumentsResponse';
import Documents, { DocumentsPrimitives } from '@src/domain/documents';

export default class SearchDocumentsResponseMother {
    static create(documents: DocumentsPrimitives): SearchDocumentsResponse {
        return new SearchDocumentsResponse(new Documents(documents));
    }

    static fromDocuments(documents: Documents) {
        return SearchDocumentsResponseMother.create(documents.toPrimitives());
    }

    static empty() {
        return SearchDocumentsResponseMother.fromDocuments(
            DocumentsMother.empty()
        );
    }
}