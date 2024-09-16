import RoleMother from "@src/domain/role.mother";
import UpdateRoleCommand, { UpdateRoleCommandData } from "./updateRoleCommand";
import Role from "@src/domain/role";

export default class UpdateRoleCommandMother {
    static create(data: UpdateRoleCommandData) {
        return new UpdateRoleCommand(data);
    }

    static random() {
        return UpdateRoleCommandMother.create(RoleMother.random().toPrimitives());
    }

    static applyCommand(command: UpdateRoleCommand): Role {
        return RoleMother.random(command.data);
    }
}