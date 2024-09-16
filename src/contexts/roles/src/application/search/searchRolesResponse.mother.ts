import Roles, { RolesPrimitives } from "@src/domain/roles";
import SearchRolesResponse from "./searchRolesResponse";
import RolesMother from "@src/domain/roles.mother";

export default class SearchRolesResponseMother {
    static create(primitives: RolesPrimitives): SearchRolesResponse {
        return new SearchRolesResponse(new Roles(primitives));
    }
    
    static fromRoles(roles: Roles): SearchRolesResponse {
        return SearchRolesResponseMother.create(roles.toPrimitives());
    }

    static empty() {
        return SearchRolesResponseMother.fromRoles(RolesMother.empty());
    }
}