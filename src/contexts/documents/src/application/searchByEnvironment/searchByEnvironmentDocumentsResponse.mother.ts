import DocumentsMother from '@src/domain/documents.mother';
import SearchByEnvironmentDocumentsResponse from './searchByEnvironmentDocumentsResponse';
import Documents, { DocumentsPrimitives } from '@src/domain/documents';

export default class SearchByEnvironmentDocumentsResponseMother {
    static create(documents: DocumentsPrimitives): SearchByEnvironmentDocumentsResponse {
        return new SearchByEnvironmentDocumentsResponse(new Documents(documents));
    }

    static random(): SearchByEnvironmentDocumentsResponse {
        return SearchByEnvironmentDocumentsResponseMother.create(
            DocumentsMother.random().toPrimitives()
        )
    }

    static fromDocuments(documents: Documents) {
        return SearchByEnvironmentDocumentsResponseMother.create(documents.toPrimitives());
    }

    static empty() {
        return SearchByEnvironmentDocumentsResponseMother.fromDocuments(
            DocumentsMother.empty()
        );
    }
}