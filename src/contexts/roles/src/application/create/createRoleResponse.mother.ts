import Role, { RolePrimitives } from "@src/domain/role";
import CreateRoleResponse from "./createRoleResponse";
import RoleMother from "@src/domain/role.mother";

export default class CreateRoleResponseMother {
    static create(primitives: RolePrimitives) {
        return new CreateRoleResponse(new Role(primitives));
    }

    static random(primitives?: Partial<RolePrimitives>) {
        return CreateRoleResponseMother.create(
            RoleMother.random(primitives).toPrimitives()
        );
    }
}