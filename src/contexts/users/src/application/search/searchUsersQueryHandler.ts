import Query from '@context/shared/domain/queryBus/query';
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import SearchUsersQuery from '@src/application/search/searchUsersQuery';
import SearchUsersResponse from '@src/application/search/searchUsersResponse';
import UsersSearcher from './usersSearcher';

export default class SearchUsersQueryHandler implements QueryHandler<SearchUsersQuery, SearchUsersResponse> {
    private readonly searcher: UsersSearcher;

    constructor(searcher: UsersSearcher) {
        this.searcher = searcher;
    }

    // eslint-disable-next-line class-methods-use-this
    subscribedTo(): Query {
        return SearchUsersQuery;
    }

    handle(query: SearchUsersQuery): Promise<SearchUsersResponse> {
        return this.searcher.run(query);
    }
}
