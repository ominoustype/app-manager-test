import Role, { RolePrimitives } from "@src/domain/role";
import FindByCustomerAndNameRoleResponse from "./findByCustomerAndNameRoleResponse";

export default class FindByCustomerAndNameRoleResponseMother {
    static create(primitives: RolePrimitives) {
        return new FindByCustomerAndNameRoleResponse(new Role(primitives));
    }
}