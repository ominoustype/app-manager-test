import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import Query from "@context/shared/domain/queryBus/query";
import FindByCustomerAndNameRoleQuery from "./findByCustomerAndNameRoleQuery";
import FindByCustomerAndNameRoleResponse from "./findByCustomerAndNameRoleResponse";
import RoleByCustomerAndNameFinder from "./roleByCustomerAndNameFinder";

export default class FindByCustomerAndNameRoleQueryHandler implements QueryHandler<FindByCustomerAndNameRoleQuery, FindByCustomerAndNameRoleResponse>{
    private readonly finder: RoleByCustomerAndNameFinder;

    constructor(finder: RoleByCustomerAndNameFinder) {
        this.finder = finder;
    }

    subscribedTo(): Query {
        return FindByCustomerAndNameRoleQuery;
    }
    
    handle(query: FindByCustomerAndNameRoleQuery): Promise<FindByCustomerAndNameRoleResponse> {
        return this.finder.run(query);
    }
}