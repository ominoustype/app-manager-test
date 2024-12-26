import Command from "@context/shared/domain/commandBus/command";
import { EnvironmentPrimitives } from "@src/domain/environment";

export type UpdateEnvironmentCommandData = Partial<EnvironmentPrimitives>;

export type UpdateEnvironmentCommandPermissions = {
    environmentIds: Array<string>
};

export default class UpdateEnvironmentCommand extends Command{
    readonly data: UpdateEnvironmentCommandData;
    readonly permissions: UpdateEnvironmentCommandPermissions

    constructor(data: UpdateEnvironmentCommandData, permissions: UpdateEnvironmentCommandPermissions){
        super();
        this.data = data;
        this.permissions = permissions;
    }
}