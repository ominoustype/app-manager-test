import Command from '@context/shared/domain/commandBus/command';
import { RolePrimitives } from "@src/domain/role";

export type UpdateRoleCommandData = Partial<RolePrimitives>;

export default class UpdateRoleCommand extends Command {
    readonly data: UpdateRoleCommandData;

    constructor(data: UpdateRoleCommandData) {
        super();
        this.data = data;
    }
}