import SearchEnvironmentsQuery, { SearchEnvironmentsQueryParams } from "./searchEnvironmentsQuery";

export default class SearchEnvironmentsQueryMother {
    static create(params: SearchEnvironmentsQueryParams): SearchEnvironmentsQuery {
        return new SearchEnvironmentsQuery(params);
    }

    static random(): SearchEnvironmentsQuery {
        return SearchEnvironmentsQueryMother.create({
            
        })
    }
}