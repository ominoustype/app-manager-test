import SearchDocumentsQuery, { SearchDocumentsQueryParams } from './searchDocumentsQuery';

export default class SearchDocumentsQueryMother {
    static create(params: SearchDocumentsQueryParams): SearchDocumentsQuery {
        return new SearchDocumentsQuery(params);
    }

    static random(): SearchDocumentsQuery {
        return SearchDocumentsQueryMother.create({
            
        })
    }
}
