import UuidMother from '@context/shared/domain/uuid.mother';
import SearchByEnvironmentDocumentsQuery, { SearchByEnvironmentDocumentQueryPermissions, SearchByEnvironmentDocumentsQueryParams } from './searchByEnvironmentDocumentsQuery';
import EnvironmentIdMother from '@src/domain/environment/environmentId.mother';

export default class SearchByEnvironmentDocumentsQueryMother {
    static create(params: SearchByEnvironmentDocumentsQueryParams, permissions: SearchByEnvironmentDocumentQueryPermissions): SearchByEnvironmentDocumentsQuery {
        return new SearchByEnvironmentDocumentsQuery(params, permissions);
    }

    static random(): SearchByEnvironmentDocumentsQuery {
        return SearchByEnvironmentDocumentsQueryMother.create({
            environment: UuidMother.random().toString()
        },
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        })
    }
}
