import EnvironmentIdMother from '@src/domain/environment/environmentId.mother';
import SearchDocumentsQuery, { SearchDocumentQueryPermissions, SearchDocumentsQueryParams } from './searchDocumentsQuery';

export default class SearchDocumentsQueryMother {
    static create(params: SearchDocumentsQueryParams, permissions: SearchDocumentQueryPermissions): SearchDocumentsQuery {
        return new SearchDocumentsQuery(params, permissions);
    }

    static random(): SearchDocumentsQuery {
        return SearchDocumentsQueryMother.create({
            count: true
        },  
        {
            environmentIds: EnvironmentIdMother.randomList().map((id) => id.value)
        });
    }
}
