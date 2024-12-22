import Document from '@src/domain/document';
import FindDocumentQuery, { FindDocumentQueryParams, FindDocumentQueryPermissions } from './findDocumentQuery';
import UuidMother from '@context/shared/domain/uuid.mother';
import DocumentMother from '@src/domain/document.mother';
import EnvironmentIdMother from '@src/domain/environment/environmentId.mother';

export default class FindDocumentQueryMother {
    static create(params: FindDocumentQueryParams, permissions: FindDocumentQueryPermissions): FindDocumentQuery {
        return new FindDocumentQuery(params, permissions);
    }

    static random(): FindDocumentQuery {
        return FindDocumentQueryMother.create({
            id: UuidMother.random().value
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        })
    }

    static randomDocument(query: FindDocumentQuery): Document {
        const id = UuidMother.create(query.id).toString()

        return DocumentMother.random({id})
    }
}
