import Role, { RolePrimitives } from "@src/domain/role";

export default class FindRoleResponse {
    readonly primitives: RolePrimitives;

    constructor(role: Role) {
        this.primitives = role.toPrimitives();
    }
}