import UuidMother from '@context/shared/domain/uuid.mother';
import SearchByEnvironmentDocumentsQuery, { SearchByEnvironmentDocumentsQueryParams } from './searchByEnvironmentDocumentsQuery';

export default class SearchByEnvironmentDocumentsQueryMother {
    static create(params: SearchByEnvironmentDocumentsQueryParams): SearchByEnvironmentDocumentsQuery {
        return new SearchByEnvironmentDocumentsQuery(params);
    }

    static random(): SearchByEnvironmentDocumentsQuery {
        return SearchByEnvironmentDocumentsQueryMother.create({
            environment: UuidMother.random().toString()
        })
    }
}
