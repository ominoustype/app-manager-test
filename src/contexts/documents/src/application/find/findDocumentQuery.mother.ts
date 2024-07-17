import Document from '@src/domain/document';
import FindDocumentQuery, { FindDocumentQueryParams } from './findDocumentQuery';
import UuidMother from '@context/shared/domain/uuid.mother';
import DocumentMother from '@src/domain/document.mother';

export default class FindDocumentQueryMother {
    static create(params: FindDocumentQueryParams): FindDocumentQuery {
        return new FindDocumentQuery(params);
    }

    static random(): FindDocumentQuery {
        return FindDocumentQueryMother.create({
            id: UuidMother.random().value
        })
    }

    static randomDocument(query: FindDocumentQuery): Document {
        const id = UuidMother.create(query.id).value

        return DocumentMother.random({id})
    }
}
