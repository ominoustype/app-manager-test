import SearchRolesQuery, { SearchRolesQueryParams } from "./searchRolesQuery";

export default class SearchRolesQueryMother {
    static create(params: SearchRolesQueryParams): SearchRolesQuery {
        return new SearchRolesQuery(params);
    }

    static random(): SearchRolesQuery {
        return SearchRolesQueryMother.create({});
    }
}