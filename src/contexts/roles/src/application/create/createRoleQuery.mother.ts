import RoleMother from "@src/domain/role.mother";
import Role from "@src/domain/role";
import CreateRoleQuery, { CreateRoleQueryParams } from "./createRoleQuery";

export default class CreateRoleQueryMother {
    static create(queryParams: CreateRoleQueryParams): CreateRoleQuery {
        return new CreateRoleQuery(queryParams);
    }
    
    static random(): CreateRoleQuery {
        return CreateRoleQueryMother.create(
            RoleMother.random().toPrimitives()
        );
    }

    static applyQuery(query: CreateRoleQuery): Role {
        return RoleMother.random(query.data);
    }
}