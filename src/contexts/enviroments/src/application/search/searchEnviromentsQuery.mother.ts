import SearchEnviromentsQuery, { SearchEnviromentsQueryParams } from "./searchEnviromentsQuery";

export default class SearchEnviromentsQueryMother {
    static create(params: SearchEnviromentsQueryParams): SearchEnviromentsQuery {
        return new SearchEnviromentsQuery(params);
    }

    static random(): SearchEnviromentsQuery {
        return SearchEnviromentsQueryMother.create({
            
        })
    }
}