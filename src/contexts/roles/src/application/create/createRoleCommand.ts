import Command from "@context/shared/domain/commandBus/command";
import { RolePrimitives } from "@src/domain/role";

export type CreateRoleCommandData = Omit<RolePrimitives, 'id'>

export default class CreateRoleCommand extends Command {
    readonly data: CreateRoleCommandData;

    constructor(data:CreateRoleCommandData) {
        super();
        this.data = data;
    }
}