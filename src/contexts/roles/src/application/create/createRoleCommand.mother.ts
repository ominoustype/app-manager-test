import RoleMother from "@src/domain/role.mother";
import CreateRoleCommand, { CreateRoleCommandData } from "./createRoleCommand";
import Role from "@src/domain/role";

export default class CreateRoleCommandMother {
    static create(data: CreateRoleCommandData): CreateRoleCommand {
        return new CreateRoleCommand(data);
    }
    
    static random(): CreateRoleCommand {
        return CreateRoleCommandMother.create(
            RoleMother.random().toPrimitives()
        );
    }

    static applyCommand(command: CreateRoleCommand): Role {
        return RoleMother.random(command.data);
    }
}