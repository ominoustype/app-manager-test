import SearchCustomersQuery, { SearchCustomersQueryParams } from "./searchCustomersQuery";

export default class SearchCustomersQueryMother {
    static create(params: SearchCustomersQueryParams): SearchCustomersQuery {
        return new SearchCustomersQuery(params);
    }

    static random(): SearchCustomersQuery {
        return SearchCustomersQueryMother.create({
            
        })
    }
}