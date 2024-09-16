import Query from "@context/shared/domain/queryBus/query";
import SearchRolesQuery from "./searchRolesQuery";
import SearchRolesResponse from "./searchRolesResponse";
import { QueryHandler } from '@context/shared/domain/queryBus/queryHandler';
import RolesSearcher from "./rolesSearcher";

export default class SearchRolesQueryHandler implements QueryHandler<SearchRolesQuery, SearchRolesResponse> {
    private readonly searcher: RolesSearcher;

    constructor(searcher: RolesSearcher) {
        this.searcher = searcher
    }

    subscribedTo(): Query {
        return SearchRolesQuery;
    }

    handle(query: SearchRolesQuery): Promise<SearchRolesResponse> {
        return this.searcher.run(query);
    }
}