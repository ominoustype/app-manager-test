import DocumentsMother from '@src/domain/documents.mother';
import SearchDocumentsResponse from './searchDocumentsResponse';
import Documents, { DocumentsPrimitives } from '@src/domain/documents';

export default class SearchDocumentsResponseMother {
    static create(documents: DocumentsPrimitives, count: number): SearchDocumentsResponse {
        return new SearchDocumentsResponse(new Documents(documents), count);
    }

    static fromDocuments(documents: Documents) {
        return SearchDocumentsResponseMother.create(documents.toPrimitives(), documents.length);
    }

    static empty() {
        return SearchDocumentsResponseMother.create(
            DocumentsMother.empty().toPrimitives(),
            -1
        );
    }
}