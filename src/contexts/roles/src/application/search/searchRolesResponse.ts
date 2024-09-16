import { Response } from "@context/shared/domain/queryBus/response";
import Roles, { RolesPrimitives } from "@src/domain/roles";

export default class SearchRolesResponse implements Response{
    readonly primitives: RolesPrimitives;

    constructor(roles: Roles) {
        this.primitives = roles.toPrimitives();
    }
}