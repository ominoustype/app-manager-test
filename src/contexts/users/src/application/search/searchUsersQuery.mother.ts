import SearchUsersQuery, { SearchUsersQueryParams } from './searchUsersQuery';

export default class SearchUsersQueryMother {
    static create(params: SearchUsersQueryParams): SearchUsersQuery {
        return new SearchUsersQuery(params);
    }

    static random(): SearchUsersQuery {
        return SearchUsersQueryMother.create({

        })
    }
}
