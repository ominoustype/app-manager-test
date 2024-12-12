
import Query from "@context/shared/domain/queryBus/query";
import { QueryHandler } from "@context/shared/domain/queryBus/queryHandler";
import CreateRoleQuery from "./createRoleQuery";
import CreateRoleResponse from "./createRoleResponse";
import RoleCreator from "./roleCreator";

export default class CreateRoleQueryHandler implements QueryHandler<CreateRoleQuery, CreateRoleResponse> {
    private readonly creator: RoleCreator;

    constructor(creator: RoleCreator){
        this.creator = creator;
    }

    subscribedTo(): Query {
        return CreateRoleQuery;
    }

    handle(query: CreateRoleQuery): Promise<CreateRoleResponse> {
        return this.creator.run(query);
    }
}