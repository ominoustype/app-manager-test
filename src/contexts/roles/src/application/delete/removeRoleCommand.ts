import Command from "@context/shared/domain/commandBus/command";
import { RolePrimitives } from "@src/domain/role";

export type RemoveRoleCommandData = Partial<RolePrimitives>;

export default class RemoveRoleCommand extends Command {
    readonly data: RemoveRoleCommandData;

    constructor(data: RemoveRoleCommandData) {
        super();
        this.data = data;
    }
}