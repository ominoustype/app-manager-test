import RoleMother from "@src/domain/role.mother";
import RemoveRoleCommand, { RemoveRoleCommandData } from "./removeRoleCommand";
import Role from "@src/domain/role";

export default class RemoveRoleCommandMother {
    static create(data: RemoveRoleCommandData): RemoveRoleCommand {
        return new RemoveRoleCommand(data);
    }

    static random(): RemoveRoleCommand {
        return RemoveRoleCommandMother.create(RoleMother.random().toPrimitives());
    }

    static applyCommand(command: RemoveRoleCommand): Role {
        return RoleMother.random(command.data);
    }
}