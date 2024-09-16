import Role, { RolePrimitives } from "@src/domain/role";
import FindRoleResponse from "./findRoleResponse";

export default class FindRoleResponseMother {
    static create(primitives: RolePrimitives) {
        return new FindRoleResponse(new Role(primitives));
    }
}