import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import FindRoleQuery from "./findRoleQuery";
import FindRoleResponse from "./findRoleResponse";
import Query from "@context/shared/domain/queryBus/query";
import RoleFinder from "./roleFinder";

export default class FindRoleQueryHandler implements QueryHandler<FindRoleQuery, FindRoleResponse>{
    private readonly finder: RoleFinder;

    constructor(finder: RoleFinder) {
        this.finder = finder;
    }

    subscribedTo(): Query {
        return FindRoleQuery;
    }
    
    handle(query: FindRoleQuery): Promise<FindRoleResponse> {
        return this.finder.run(query);
    }
}